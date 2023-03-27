export const calImc = (weight: number, height: number) =>{

    if (!weight && !height){
        return  {imc: null, resultImc : null}
    }

    let  cmToMt = parseFloat( (height/100).toFixed(2))

    console.log(cmToMt)

    let imc =   parseFloat( (weight/ Math.pow(cmToMt, 2)).toFixed(2))

    return {
        imc,
        resultImc: messageImc(imc)
    }

}


const  messageImc= (imc: number) =>{


    if (imc<18.5) return "Peso Inferior  al normal"
    if (imc>=18.5  && imc<=24.9) return "Normal"
    if (imc>=25.0  && imc<=29.9) return "Sobrepeso"
    if (imc>30.0 ) return "Obecidad"

    return null
}