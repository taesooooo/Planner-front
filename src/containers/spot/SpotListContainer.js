import { useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import {
    addSpotLikeAction,
    checkLikeListAction,
    cleanCurrentInfoAction,
    cleanLikeListAction,
    cleanSpotsAction,
    loadAreasAction,
    loadDetailSpotAction,
    loadSpotsAction,
    removeSpotLikeAction,
    toggleDetailLikeAction,
    unloadDetailSpotAction,
    updateAreaNumAction,
    updateBlockNumAction,
    updateDetailSpotAction,
    updatePageNumAction,
    updateSpotsLikeAction,
} from '../../modules/spotModule';

const SpotListContainer = ({
    areas,
    spots,
    spotError,
    detail,
    currentInfo,
    account,
    likeList,
    loadAreas,
    loadSpots,
    loadDetailSpot,
    updateAreaNum,
    updatePageNum,
    updateBlockNum,
    checkLikeList,
    addSpotLike,
    removeSpotLike,
    unloadDetailSpot,
    updateSpotsLike,
    cleanSpots,
    cleanLikeList,
    cleanCurrentInfo,
    toggleDetailLike,
    updateDetailSpot,
}) => {
    const { areaNum, pageNum } = currentInfo;

    // 지역 가져오기
    useEffect(() => {
        if (areaNum) {
            loadAreas();
        }
    }, [loadAreas, areaNum]);

    // const onUpdateSpotsLike = useMemo(() => {
        //     return new Promise(() => {
    //         setTimeout(() => {
    //             if (likeList) {
    //                 updateSpotsLike(likeList);
    //             }
    //         }, 1000);
    //     });
    // }, [likeList, updateSpotsLike]);

    // 여행지 가져오기
    useEffect(() => {
        const onUpdateSpotsLike = await () => {
            return new Promise(() => {
                setTimeout(() => {
                    if (likeList) {
                        updateSpotsLike(likeList);
                    }
                }, 1000);
            });
        };

        if (areas) {
            const onLoadSpots = async () => {
                loadSpots(areaNum, pageNum);

                await onUpdateSpotsLike();
            };
            onLoadSpots();
        }
    }, [loadSpots, areaNum, pageNum, areas, onUpdateSpotsLike]);

    // 여행지 상세정보 모달 열기
    const sDrag = useRef(false);
    const onOpenDetail = (spot) => {
        if (sDrag.current) {
            sDrag.current = false;
            return;
        }
        loadDetailSpot(spot.info.contentid);
        updateDetailSpot(spot);
    };

    // 여행지 첫페이지
    const mDrag = useRef(false);
    const onFirstSpotsPage = (areaCode) => {
        if (mDrag.current) {
            // e.stopPropagation();
            mDrag.current = false;
            return;
        }
        // if (spots) {
        updateAreaNum(areaCode);
        updatePageNum(1);
        updateBlockNum(0);
        // }
    };

    // 사용자의 좋아요 여행지 비교
    useEffect(() => {
        if (spots && account) {
            const { accountId } = account;
            const contentIdArr = spots.list.map((spot) => {
                return spot.info.contentid;
            });

            if (!likeList) {
                checkLikeList(accountId, contentIdArr);
            }
        }
    }, [spots, account, checkLikeList, likeList]);

    // 여행지 초기화
    useEffect(() => {
        cleanSpots();
    }, [areaNum, pageNum, cleanSpots]);

    useEffect(() => {
        return () => {
            cleanSpots();
            cleanCurrentInfo();
        };
    }, [cleanCurrentInfo, cleanSpots]);

    // loadspots시작 cleanspots loadSpots성공 checklikeList시작 성공 updatespotslike
    // 여행지 좋아요 최신화
    // useEffect(() => {
    //     if (likeList) {
    //         updateSpotsLike(likeList);
    //     }
    // }, [likeList, updateSpotsLike]);

    // 여행지 좋아요 토글
    const onToggleSpotLike = (contentId) => {
        const { like } = detail.info;
        toggleDetailLike();
        if (like === false) {
            addSpotLike(contentId);
        } else {
            removeSpotLike(contentId);
        }
    };

    // 좋아요리스트 초기화
    // 여행지 좋아요 토글 시, cleaning 후 updatespotslike
    useEffect(() => {
        cleanLikeList();
    }, [cleanLikeList, detail]);

    return (
        <SpotList
            areas={areas}
            spots={spots}
            spotError={spotError}
            detail={detail}
            currentInfo={currentInfo}
            onFirstSpotsPage={onFirstSpotsPage}
            onUnloadDetailSpot={unloadDetailSpot}
            onToggleSpotLike={onToggleSpotLike}
            onOpenDetail={onOpenDetail}
            mDrag={mDrag}
            sDrag={sDrag}
        />
    );
};

const mapStateToProps = (state) => ({
    areas: state.spotReducer.areas,
    spots: state.spotReducer.spots,
    detail: state.spotReducer.detail,
    spotError: state.spotReducer.spotError,
    currentInfo: state.spotReducer.currentInfo,
    likeList: state.spotReducer.likeList,
    account: state.authReducer.account,
});
const mapDispatchToProps = (dispatch) => ({
    loadAreas: () => {
        dispatch(loadAreasAction());
    },
    loadSpots: (areaCode, page) => {
        dispatch(loadSpotsAction(areaCode, page));
    },
    updateAreaNum: (num) => {
        dispatch(updateAreaNumAction(num));
    },
    updatePageNum: (num) => {
        dispatch(updatePageNumAction(num));
    },
    updateBlockNum: (num) => {
        dispatch(updateBlockNumAction(num));
    },
    loadDetailSpot: (id) => {
        dispatch(loadDetailSpotAction(id));
    },
    updateDetailSpot: (spotInfo) => {
        dispatch(updateDetailSpotAction(spotInfo));
    },
    unloadDetailSpot: () => {
        dispatch(unloadDetailSpotAction());
    },
    checkLikeList: (accountId, spotId) => {
        dispatch(checkLikeListAction(accountId, spotId));
    },
    addSpotLike: (spotId) => {
        dispatch(addSpotLikeAction(spotId));
    },
    removeSpotLike: (spotId) => {
        dispatch(removeSpotLikeAction(spotId));
    },
    updateSpotsLike: (likes) => {
        dispatch(updateSpotsLikeAction(likes));
    },
    toggleDetailLike: () => {
        dispatch(toggleDetailLikeAction());
    },
    cleanSpots: () => {
        dispatch(cleanSpotsAction());
    },
    cleanLikeList: () => {
        dispatch(cleanLikeListAction());
    },
    cleanCurrentInfo: () => {
        dispatch(cleanCurrentInfoAction());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
