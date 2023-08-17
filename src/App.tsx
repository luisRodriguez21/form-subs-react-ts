import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './components/List';
import Form from './components/Form';
import { Sub, SubResponseFromApi } from './types';
 
// https://i.pravatar.cc/150?u=depelu


// o se puede usar asi
interface AppState  {
	subs: Array<Sub>
	newSubsNumber: number
}


function App() {
	const [subs, setSubs] = useState<Array<Sub>>([]); // <AppState["subs"]>
	const [newSubsNumbers, setNewSubsNumbers] = useState<AppState["newSubsNumber"]>(0);
	const divRef = useRef<HTMLDivElement>(null);


	useEffect(() => {
        const fetchSubs = (): Promise<SubResponseFromApi> => {
			return fetch("http://localhost/api/v1/").then(res => res.json())
		}

		const mapFromApiToSubs = (apiResponse: SubResponseFromApi):Array<Sub> => {
			return apiResponse.map(subFromApi => {		
				const { nick, months: subMonths, profileUrl: avatar, description } = subFromApi;
				return { nick, description, avatar, subMonths};
			})
		}

		fetchSubs()
			.then(mapFromApiToSubs)
			.then(setSubs)

    }, [])


	const handleNewSub = (newSub: Sub) => {
		setSubs(subs => [...subs, newSub]);
		setNewSubsNumbers(n => n + 1)
	}

	
	

	return (
		<div className="App" ref={divRef}>
			<h1>Midu subs</h1>
			<List subs={subs} />

			New subs: {newSubsNumbers}

			<Form handleNewSub={handleNewSub} />
		</div>
	)
}

export default App
