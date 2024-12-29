import PropTypes from 'prop-types';

export default function Loading({ state }) {
	return (
		<>
			{state && (
				<div>
					{/* <div className='font-bold text-2xl text-center  mt-5 '>
						V
						<span className='font-bold text-3xl text-center text-gray-500  mt-5 '>
							NN
						</span>
						IX
					</div> */}
					<div
						className='fixed top-0 flex  bg-blue-400 bg-opacity-25 left-0 w-full justify-center items-center '
						style={{ height: '100vh', zIndex: 1000 }}
					>
						<span className='loader'></span>
					</div>
				</div>
			)}
		</>
	);
}
Loading.propTypes = {
	state: PropTypes.bool
};
