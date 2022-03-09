import './App.css';
import { NavBar } from './NavBar';
import { Map } from './Map';
import { useTopoData } from './useTopoData';
import { Metadata } from './Metadata';

import { schemeTableau10 } from 'd3';

// dummy data for now: eventually connect to real backend
const dummyData = {
    group_index: '2',
    superlocs: [{
        name: 'Los Angeles, CA',
        coords: [-118.2437, 34.0522],
        id: 1
    }, {
        name: 'Austin, TX',
        coords: [-97.7431, 30.2672],
        id: 2
    }, {
        name: 'Chicago, IL',
        coords: [-87.6298, 41.8781], 
        id: 3
    }],
    metadata: [{
        name: '123-456-7890',
        type: 'phone',
        trajectory: [{
            source: 1, 
            target: 2,
            source_date: new Date('Jan 1 2021'),
            target_date: new Date('Jan 2 2021')
        }, {
            source: 2,
            target: 3,
            source_date: new Date('Jan 2 2021'),
            target_date: new Date('Jan 2 2021')
        }]
    }, {
        name: '234-567-8901',
        type: 'phone',
        trajectory: [{
            source: 1,
            target: 2,
            source_date: new Date('Jan 2 2021'),
            target_date: new Date('Jan 3 2021')
        }, {
            source: 2,
            target: 3,
            source_date: new Date('Jan 3 2021'),
            target_date: new Date('Jan 4 2021')
        }, {
            source: 3,
            target: 2,
            source_date: new Date('Jan 4 2021'),
            target_date: new Date('Jan 5 2021')
        }]
    }, {
        name: '345-678-9012',
        type: 'phone',
        trajectory: [{
            source: 1,
            target: 2,
            source_date: new Date('Jan 3 2021'),
            target_date: new Date('Jan 4 2021'),
        }, {
            source: 2,
            target: 3,
            source_date: new Date('Jan 4 2021'),
            target_date: new Date('Jan 5 2021')
        }, {
            source: 3,
            target: 2,
            source_date: new Date('Jan 5 2021'),
            target_date: new Date('Jan 6 2021')
        }]
    }]
};

const width = window.innerWidth;
const height = window.innerHeight;

const App = () => {
    const topodata = useTopoData();

    if (!topodata) {
        return <>Loading...</>
    }

    let superlocColors = {};
    dummyData.superlocs.map((d, index) => {
        superlocColors[d.id] = schemeTableau10[index];
    })

    return (
        <>
            <NavBar
                group_index={dummyData.group_index}
                num_superlocs={dummyData.superlocs.length}
                num_metadata={dummyData.metadata.length}
            />

            <Map 
                topodata={topodata}
                data={dummyData}
                offsetx={width/2}
                offsety={0}
                width={width/3}
                height={height/3}
                superlocColors={superlocColors}
            />

            <Metadata
                data={dummyData}
                offsetx={width/2}
                offsety={0}
                width={width/3}
                height={height/3}
                superlocColors={superlocColors}
            />
        </>
    )
};

export default App;