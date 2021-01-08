class ConsultarCEP {
  constructor(btn, cep, resultado) {
    this.btn = document.querySelector(btn);
    this.cep = document.querySelector(cep);
    this.resultado = document.querySelector(resultado);
  }

  mostrarErro() {
    this.cep.classList.add("erro");
    this.resultado.innerHTML = `
      <span class="erro">Erro na consulta. Por favor, preencha o campo acima com
      apenas os números do CEP desejado (8 números).</span>
    `;
  }

  mostrarResultado(responseCEP) {
    this.cep.classList.remove("erro");
    this.resultado.innerHTML = `
      <span>CEP:</span><span>${responseCEP.cep}</span>
      <span>Logradouro:</span><span>${responseCEP.logradouro}</span>
      <span>Complemento:</span><span>${responseCEP.complemento}</span>
      <span>Bairro:</span><span>${responseCEP.bairro}</span>
      <span>Localidade:</span><span>${responseCEP.localidade}</span>
      <span>UF:</span><span>${responseCEP.uf}</span>
      <span>DDD:</span><span>${responseCEP.ddd}</span>
    `;
  }

  async buscarCEP() {
    const cep = this.cep.value;
    try {
      const fetchCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const responseCEP = await fetchCEP.json();
      this.mostrarResultado(responseCEP);
    } catch (error) {
      this.mostrarErro();
    }
  }

  addEvent() {
    this.btn.addEventListener("click", () =>
      setTimeout(() => this.buscarCEP(), 0)
    );
  }

  bindEvent() {
    this.buscarCEP = this.buscarCEP.bind(this);
  }

  init() {
    this.bindEvent();
    this.addEvent();
    return this;
  }
}

const buscarCEP = new ConsultarCEP(".btn", ".cep", ".resultado");
buscarCEP.init();
