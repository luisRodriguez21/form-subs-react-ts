import { Sub } from '../types';
// children: 
// JSX.Element // SX.Element elemento de JSX | React.ReactNode - Acepta todo | (name: string) => React.ReactNode = funcion
    

interface Props {
    subs: Array<Sub>
}

// se define de esta manera para que pueda recibir props y children - FunctionComponents
// solo usarse cuando usaremos children
// si no usamos children definimos: ({ subs } : Props ) 
const List = ({ subs } : Props ) => {
    


    return (
        <ul>
            {
                subs.map((sub, index) => {
                    return (
                        <li key={index}>
                            <img src={sub.avatar} alt={sub.nick} />
                            <h4>{sub.nick} (<span>{sub.subMonths} meses</span>)  </h4>
                            <p>{sub.description?.substring(0, 100)}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default List;
