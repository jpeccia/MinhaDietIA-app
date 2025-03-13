interface RefeicoesProps{
    horario: string;
    nome: string;
    alimentos: string[];
}

export interface Data {
    nome: string;
    sexo: string;
    idade: number;
    altura: number;
    peso: number;
    calorias: number;
    objetivo: string;
    refeicoes: RefeicoesProps[];
    suplementos: string[];
}