import { useState, FormEvent } from "react";
import "./App.css";

import logo from "./assets/logo.png";

interface ResultProps {
  title: string;
  gasoline: string | number;
  alcohol: string | number;
}

function App() {
  const [gasolineInput, setGasolineInput] = useState<number>(0);
  const [alcoholInput, setAlcoholInput] = useState<number>(0);
  const [result, setResult] = useState<ResultProps>();

  function calculate(event: FormEvent) {
    const calc: number = alcoholInput / gasolineInput;
    const title = calc <= 0.7 ? "álcool" : "Gasolina";

    setResult({
      title: `Compensa usar ${title}!`,
      gasoline: formatValue(gasolineInput),
      alcohol: formatValue(alcoholInput),
    });
  
    event.preventDefault();
  }

  function formatValue(value: number){
    return value.toLocaleString("pt-br",{
      style: "currency",
      currency: "BRL"
    })
  }

  return (
    <div>
      <main className="container">
        <img className="logo" src={logo} alt="Imagem de bomba de combustível" />
        <h1 className="title">Qual melhor opção?</h1>

        <form className="form" onSubmit={calculate}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4.90"
            min="1"
            step="0.01"
            required
            value={alcoholInput}
            onChange={(e) => setAlcoholInput(Number(e.target.value))}
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4.90"
            min="1"
            step="0.01"
            required
            value={gasolineInput}
            onChange={(e) => setGasolineInput(Number(e.target.value))}
          />

          <input className="button" type="submit" value="Calcular" />
        </form>

        {result && Object.keys(result).length > 0 && (
          <section className="result">
            <h2 className="result-title">{result.title}</h2>

            <span>Álcool {result.alcohol}</span>
            <span>Gasolina {result.gasoline}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
