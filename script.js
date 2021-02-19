class SearchCEP {
  constructor(btn, cep, result) {
    this.btn = document.querySelector(btn);
    this.cep = document.querySelector(cep);
    this.result = document.querySelector(result);
  }

  displayError() {
    this.cep.classList.add('error');
    this.result.innerHTML = `
      <span class="error">Erro na consulta. Por favor, preencha o campo acima com
      apenas os números do CEP desejado (8 números).</span>
    `;
  }

  displayResult(data) {
    this.cep.classList.remove('error');
    this.result.innerHTML = `
      <span>CEP:</span><span>${data.cep}</span>
      <span>Logradouro:</span><span>${data.logradouro}</span>
      <span>Complemento:</span><span>${data.complemento}</span>
      <span>Bairro:</span><span>${data.bairro}</span>
      <span>Localidade:</span><span>${data.localidade}</span>
      <span>UF:</span><span>${data.uf}</span>
      <span>DDD:</span><span>${data.ddd}</span>
    `;
  }

  async fetchCEP() {
    const cep = this.cep.value;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = await response.json();
      this.displayResult(json);
    } catch (error) {
      this.displayError();
    }
  }

  addEvent() {
    this.btn.addEventListener('click', () =>
      setTimeout(() => this.fetchCEP(), 0),
    );
  }

  bindEvent() {
    this.fetchCEP = this.fetchCEP.bind(this);
  }

  init() {
    this.bindEvent();
    this.addEvent();
    return this;
  }
}

const searchCEP = new SearchCEP('.btn', '.cep', '.result');
searchCEP.init();
