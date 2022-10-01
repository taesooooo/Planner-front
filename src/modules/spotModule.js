import createRequestSaga from '../lib/createRequestSaga';
import * as spotAPI from '../lib/api/spotAPI';
import { takeLatest } from 'redux-saga/effects';

const LOAD_AREAS = 'spot/LOAD_AREAS';
const LOAD_AREAS_SUCCESS = 'spot/LOAD_AREAS_SUCCESS';
const LOAD_AREAS_FAILURE = 'spot/LOAD_AREAS_FAILURE';

const LOAD_SPOTS = 'spot/LOAD_SPOTS';
const LOAD_SPOTS_SUCCESS = 'spot/LOAD_SPOTS_SUCCESS';
const LOAD_SPOTS_FAILURE = 'spot/LOAD_SPOTS_FAILURE';

const UPDATE_AREA_NUM = 'spot/UPDATE_AREA_NUM';

const UPDATE_PAGE_NUM = 'spot/UPDATE_PAGE_NUM';

const UPDATE_BLOCK_NUM = 'spot/UPDATE_BLOCK_NUM';

const UPDATE_SPOT = 'spot/UPDATE_SPOT';

const UPDATE_SPOT_ID = 'spot/UPDATE_SPOT_ID';
const CLEAR_SPOT_ID = 'spot/REMOVE_SPOT_ID';

const LOAD_DETAIL_SPOT = 'spot/LOAD_DETAIL_SPOT';
const LOAD_DETAIL_SPOT_SUCCESS = 'spot/LOAD_DETAIL_SPOT_SUCCESS';
const LOAD_DETAIL_SPOT_FAILURE = 'spot/LOAD_DETAIL_SPOT_FAILURE';
const UNLOAD_DETAIL_SPOT = 'spot/UNLOAD_DETAIL_SPOT';

const LOAD_FAVORITES_SPOT = 'spot/LOAD_FAVORITES_SPOT';
const LOAD_FAVORITES_SPOT_SUCCESS = 'spot/LOAD_FAVORITES_SPOT_SUCCESS';
const LOAD_FAVORITES_SPOT_FAILURE = 'spot/LOAD_FAVORITES_SPOT_FAILURE';

const ADD_FAVORITES_SPOT = 'spot/ADD_FAVORITES_SPOT';
const ADD_FAVORITES_SPOT_SUCCESS = 'spot/ADD_FAVORITES_SPOT_SUCCESS';
const ADD_FAVORITES_SPOT_FAILURE = 'spot/ADD_FAVORITES_SPOT_FAILURE';

const REMOVE_FAVORITES_SPOT = 'spot/REMOVE_FAVORITES_SPOT';
const REMOVE_FAVORITES_SPOT_SUCCESS = 'spot/REMOVE_FAVORITES_SPOT_SUCCESS';
const REMOVE_FAVORITES_SPOT_FAILURE = 'spot/REMOVE_FAVORITES_SPOT_FAILURE';

export const loadAreas = () => ({ type: LOAD_AREAS });
export const loadSpots = (areaCode, page) => ({ type: LOAD_SPOTS, areaCode, page });
export const updateAreaNum = (num) => ({ type: UPDATE_AREA_NUM, num });
export const updatePageNum = (num) => ({ type: UPDATE_PAGE_NUM, num });
export const updateBlockNum = (num) => ({ type: UPDATE_BLOCK_NUM, num });
export const updateSpot = (spots) => ({ type: UPDATE_SPOT, spots });
export const updateSpotId = (id) => ({ type: UPDATE_SPOT_ID, id });
export const clearSpotId = () => ({ type: CLEAR_SPOT_ID });
export const loadDetailSpot = (id) => ({ type: LOAD_DETAIL_SPOT, id });
export const unloadDetailSpot = () => ({ type: UNLOAD_DETAIL_SPOT });
export const loadFavoritesSpot = (id) => ({ type: LOAD_FAVORITES_SPOT, id });
export const addFavoritesSpot = (spotId) => ({ type: ADD_FAVORITES_SPOT, spotId });
export const removeFavoritesSpot = (spotId) => ({ type: REMOVE_FAVORITES_SPOT, spotId });

const loadAreasSaga = createRequestSaga(LOAD_AREAS, spotAPI.loadAreas);
const loadSpotsSaga = createRequestSaga(LOAD_SPOTS, spotAPI.loadSpots);
const loadDetailSpotSaga = createRequestSaga(LOAD_DETAIL_SPOT, spotAPI.loadDetailSpot);
const loadFavoritesSpotSaga = createRequestSaga(LOAD_FAVORITES_SPOT, spotAPI.loadFavoritesSpot);
const addFavoritesSpotSaga = createRequestSaga(ADD_FAVORITES_SPOT, spotAPI.addFavoritesSpot);
const removeFavoritesSpotSaga = createRequestSaga(REMOVE_FAVORITES_SPOT, spotAPI.removeFavoritesSpot);
export function* spotSaga() {
    yield takeLatest(LOAD_AREAS, loadAreasSaga);
    yield takeLatest(LOAD_SPOTS, loadSpotsSaga);
    yield takeLatest(LOAD_DETAIL_SPOT, loadDetailSpotSaga);
    yield takeLatest(LOAD_FAVORITES_SPOT, loadFavoritesSpotSaga);
    yield takeLatest(ADD_FAVORITES_SPOT, addFavoritesSpotSaga);
    yield takeLatest(REMOVE_FAVORITES_SPOT, removeFavoritesSpotSaga);
}

const initialState = {
    areas: null,
    spots: null,
    spot: {
        info: null,
        favorites: false,
    },
    spotId: [],
    detail: null,
    spotError: null,
    favoritesSpot: null,
    areaNum: null,
    pageNum: 1,
    blockNum: 0,
};

function spotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_AREAS_SUCCESS:
            return {
                ...state,
                areas: action.payload.data.item,
            };
        case LOAD_AREAS_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case LOAD_SPOTS_SUCCESS:
            return {
                ...state,
                spots: {
                    list: action.payload.data.item.map((item) => {
                        return {
                            info: item,
                            favorites: false,
                        };
                    }),
                    totalCount: action.payload.data.totalCount,
                },
            };
        case LOAD_SPOTS_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UPDATE_SPOT:
            return {
                spot: {
                    info: action.payload,
                    favorites: action.payload,
                },
            };
        case UPDATE_AREA_NUM:
            return {
                ...state,
                areaNum: action.num,
            };
        case UPDATE_PAGE_NUM:
            return {
                ...state,
                pageNum: action.num,
            };
        case UPDATE_BLOCK_NUM:
            return {
                ...state,
                blockNum: action.num,
            };

        case UPDATE_SPOT_ID:
            return {
                ...state,
                spotId: [...state.spotId, action.id],
            };
        case CLEAR_SPOT_ID:
            return {
                ...state,
                spotId: [],
            };
        case LOAD_DETAIL_SPOT_SUCCESS:
            return {
                ...state,
                detail: action.payload.data.item,
            };
        case LOAD_DETAIL_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case UNLOAD_DETAIL_SPOT:
            return {
                ...state,
                detail: null,
            };
        case LOAD_FAVORITES_SPOT_SUCCESS:
            return {
                ...state,
                favoritesSpot: action.paylod.data,
            };
        case LOAD_FAVORITES_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case ADD_FAVORITES_SPOT_SUCCESS:
            return {
                ...state,
            };
        case ADD_FAVORITES_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };
        case REMOVE_FAVORITES_SPOT_SUCCESS:
            return {
                ...state,
            };
        case REMOVE_FAVORITES_SPOT_FAILURE:
            return {
                ...state,
                spotError: action.payload.error,
            };

        default:
            return state;
    }
}

export default spotReducer;
