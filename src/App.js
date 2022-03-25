import { schemeTableau10 } from 'd3';
import { useState } from 'react';

import './App.css';
import { Graph } from './Graph';
import { Map } from './Map';
import { Metadata } from './Metadata';
import { NavBar } from './NavBar';
import { useTopoData } from './useTopoData';

// dummy data for now: eventually connect to real backend
const dummyData = {
    group_index: '2',
    superlocs: [{
        name: 'Los Angeles, CA',
        coords: [-118.2437, 34.0522],
        id: 0
    }, {
        name: 'Austin, TX',
        coords: [-97.7431, 30.2672],
        id: 1
    }, {
        name: 'Chicago, IL',
        coords: [-87.6298, 41.8781], 
        id: 2
    }],
    metadata: [{
        name: '123-456-7890',
        type: 'phone',
        trajectory: [{
            source: 0, 
            target: 1,
            source_date: new Date('Jan 1 2021'),
            target_date: new Date('Jan 2 2021')
        }, {
            source: 1,
            target: 2,
            source_date: new Date('Jan 2 2021'),
            target_date: new Date('Jan 2 2021')
        }]
    }, {
        name: '234-567-8901',
        type: 'phone',
        trajectory: [{
            source: 0,
            target: 1,
            source_date: new Date('Jan 2 2021'),
            target_date: new Date('Jan 3 2021')
        }, {
            source: 1,
            target: 2,
            source_date: new Date('Jan 3 2021'),
            target_date: new Date('Jan 4 2021')
        }, {
            source: 2,
            target: 1,
            source_date: new Date('Jan 4 2021'),
            target_date: new Date('Jan 5 2021')
        }]
    }, {
        name: '345-678-9012',
        type: 'phone',
        trajectory: [{
            source: 0,
            target: 1,
            source_date: new Date('Jan 3 2021'),
            target_date: new Date('Jan 4 2021'),
        }, {
            source: 1,
            target: 2,
            source_date: new Date('Jan 4 2021'),
            target_date: new Date('Jan 5 2021')
        }, {
            source: 2,
            target: 1,
            source_date: new Date('Jan 5 2021'),
            target_date: new Date('Jan 6 2021')
        }]
    }]
};

const width = window.innerWidth;
const height = window.innerHeight;

const App = () => {
    const topodata = useTopoData();
    const [clickedMetadata, setClickedMetadata] = useState();

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

            <Graph
                data={dummyData}
                superlocColors={superlocColors}
                width={width/3}
                height={height/3}
                clickedMetadata={clickedMetadata}
            />

            <Map 
                topodata={topodata}
                data={dummyData}
                offsetx={width/2}
                offsety={0}
                width={width/3}
                height={height/3}
                superlocColors={superlocColors}
                clickedMetadata={clickedMetadata}
            />

            <Metadata
                data={dummyData}
                offsetx={width/2}
                offsety={0}
                width={width/3}
                height={height/3}
                superlocColors={superlocColors}
                clickedMetadata={clickedMetadata}
                setClickedMetadata={setClickedMetadata}
            />
        </>
    )
};

export default App;