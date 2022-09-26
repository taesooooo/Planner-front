import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { addFavoritesSpot, deleteFavoritesSpot, detailSpot, getAreas, listSpots, unloadDetailSpot } from '../../modules/spotModule';

const SpotListContainer = ({ areas, spots, detail, spotError, getAreas, listSpots, detailSpot, unloadDetailSpot, addFavoritesSpot, deleteFavoritesSpot }) => {
    useEffect(() => {
        getAreas();
    }, [getAreas]);

    const add
    return <SpotList areas={areas} spots={spots} detail={detail} spotError={spotError} listSpots={listSpots} detailSpot={detailSpot} unloadDetailSpot={unloadDetailSpot} />;
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    page: state.spotReducer.page,
});
const mapDispatchToProps = (dispatch) => ({
    getAreas: () => {
        dispatch(getAreas());
    },
    listSpots: (areaCode, page) => {
        dispatch(listSpots(areaCode, page));
    },
    detailSpot: (id) => {
        dispatch(detailSpot(id));
    },
    unloadDetailSpot: () => {
        dispatch(unloadDetailSpot());
    },
    addFavoritesSpot: (spotId) => {
        dispatch(addFavoritesSpot(spotId));
    },
    deleteFavoritesSpot: (spotId) => {
        dispatch(deleteFavoritesSpot(spotId));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
