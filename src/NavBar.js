const method='MethodName';
const description='metadata visualization through space and time';

export const NavBar = ({ group_index, num_superlocs, num_metadata }) => {
    return (
        <div className='nav-bar'>
            <p className='method'>{method}:</p>
            <p className='description'>{description}</p>
            <div>
                <p className='stats'>Group #
                    <span className='stat-num'>{group_index}</span>  contains
                    <span className='stat-num'> {num_superlocs}</span> superlocations and
                    <span className='stat-num'> {num_metadata}</span> pieces of metadata</p>
            </div>
        </div>
    )
};