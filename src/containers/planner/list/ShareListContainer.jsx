import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeKeywordDataAction,
    changePageNumAction,
    changePlannerDataAction,
    loadSharePlannerListAction,
    LOAD_SHARE_PLANNER_LIST_TYPE,
    plannerInitializePropertyAction,
} from '../../../modules/plannerModule';
import ShareList from '../../../components/planner/list/ShareList';
import { useState } from 'react';

const ShareListContainer = () => {
    const dispatch = useDispatch();
    const { sharePlanners, plannerError, plannerData, loading, keywordData } = useSelector(
        ({ plannerReducer, loadingReducer }) => ({
            sharePlanners: plannerReducer.sharePlanners,
            plannerError: plannerReducer.plannerError,
            planner: plannerReducer.planner,
            plannerData: plannerReducer.plannerData,
            keywordData: plannerReducer.keywordData,
            loading: loadingReducer[LOAD_SHARE_PLANNER_LIST_TYPE],
        }),
    );

    const { pageNum } = { ...plannerData };
    const { curKeyword, resultKeyword } = { ...keywordData };
    const [sortCriteria, setSortCriteria] = useState(2);
    const drag = useRef(false);

    // 플래너 검색 순위 설정
    const onChangeSort = (num) => {
        setSortCriteria(num);
    };

    // 공유 플래너리스트 가져오기
    useEffect(() => {
        dispatch(plannerInitializePropertyAction('sharePlanners'));
        const queryString = { itemCount: 12, sortCriteria, pageNum, keyword: resultKeyword };
        dispatch(loadSharePlannerListAction(queryString));
    }, [dispatch, pageNum, resultKeyword, sortCriteria]);

    // 플래너 선택
    const onClickPlanner = (plannerId) => {
        if (!drag.current) {
            dispatch(plannerInitializePropertyAction('plannerData'));
            dispatch(plannerInitializePropertyAction('planner'));

            dispatch(changePlannerDataAction({ property: 'plannerId', value: plannerId }));
            dispatch(changePlannerDataAction({ property: 'pType', value: 1 }));
        }
    };

    // 플래너 키워드 타이핑
    const onChangeKeyword = (keyword) => {
        dispatch(changeKeywordDataAction({ property: 'curKeyword', value: keyword }));
    };

    // 실제적으로 검색된 키워드 저장
    const onChangeResultKeyword = () => {
        dispatch(changeKeywordDataAction({ property: 'resultKeyword', value: curKeyword }));
    };

    // 검색 순위, 키워드 변경시 페이지 리셋
    useEffect(() => {
        dispatch(changePlannerDataAction({ property: 'pageNum', value: 1 }));
    }, [sortCriteria, resultKeyword]);

    // 키워드 리셋
    useEffect(() => {
        dispatch(changeKeywordDataAction({ property: 'curKeyword', value: '' }));
        dispatch(changeKeywordDataAction({ property: 'resultKeyword', value: '' }));
    }, [sortCriteria]);

    // 검색 키워드 및 플래너리스트 초기화
    useEffect(() => {
        return () => {
            dispatch(changeKeywordDataAction({ property: 'curKeyword', value: '' }));
            dispatch(changeKeywordDataAction({ property: 'resultKeyword', value: '' }));
            dispatch(plannerInitializePropertyAction('sharePlanners'));
            dispatch(plannerInitializePropertyAction('plannerError'));
        };
    }, [dispatch]);

    // plannerError 리셋
    const onCloseError = () => {
        dispatch(plannerInitializePropertyAction('plannerError'));
    };

    const onIndexPage = (index) => {
        dispatch(changePlannerDataAction({ property: 'pageNum', value: index }));
    };
    const onNextPage = () => {
        dispatch(changePlannerDataAction({ property: 'pageNum', value: pageNum + 1 }));
    };
    const onPreviousPage = () => {
        dispatch(changePlannerDataAction({ property: 'pageNum', value: pageNum - 1 }));
    };
    const onFirstPage = (startPage) => {
        dispatch(changePlannerDataAction({ property: 'pageNum', value: startPage }));
    };
    const onLastPage = (maxPage) => {
        dispatch(changePlannerDataAction({ property: 'pageNum', value: maxPage }));
    };

    return (
        <ShareList
            sharePlanners={sharePlanners}
            plannerError={plannerError}
            keywordData={keywordData}
            sortCriteria={sortCriteria}
            drag={drag}
            loading={loading}
            page={pageNum}
            onClickPlanner={onClickPlanner}
            onChangeKeyword={onChangeKeyword}
            onChangeResultKeyword={onChangeResultKeyword}
            onChangeSort={onChangeSort}
            onCloseError={onCloseError}
            onIndexPage={onIndexPage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
        />
    );
};

export default ShareListContainer;
