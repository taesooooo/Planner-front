import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoPostList from '../../../components/planner/info/InfoPostList';
import { changeMemoContentAction, changeMemoTitleAction, createMemoAction, deleteMemoAction, loadMemoAction, loadPlannerAction, resetMemoAction, updateMemoAction } from '../../../modules/plannerModule';

const InfoPostContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, curMemo, currentInfo } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        curMemo: plannerReducer.curMemo,
        currentInfo: plannerReducer.currentInfo,
    }));
    const { title, content } = { ...curMemo };
    const { plannerId } = { ...planner };

    const onCreateMemo = () => {
        dispatch(createMemoAction({ plannerId, title, content }));
    };

    const onUpdateMemo = (memoId) => {
        dispatch(updateMemoAction({ plannerId, memoId, title, content }));
    };

    const onDeleteMemo = (memoId) => {
        dispatch(deleteMemoAction({ plannerId, memoId }));
    };

    const onChangeMemoTitle = (title) => {
        dispatch(changeMemoTitleAction(title));
    };

    const onChangeMemoContent = (content) => {
        dispatch(changeMemoContentAction(content));
    };
    const onLoadMemo = (memo) => {
        dispatch(loadMemoAction(memo));
    };
    const onResetMemo = () => {
        dispatch(resetMemoAction());
    };

    // 플래너 정보 가져오기
    const onLoadPlanner = () => {
        dispatch(loadPlannerAction(plannerId));
    };

    return (
        <InfoPostList
            planner={planner}
            curMemo={curMemo}
            onCreateMemo={onCreateMemo}
            onUpdateMemo={onUpdateMemo}
            onDeleteMemo={onDeleteMemo}
            onChangeMemoTitle={onChangeMemoTitle}
            onChangeMemoContent={onChangeMemoContent}
            onLoadMemo={onLoadMemo}
            onResetMemo={onResetMemo}
            onLoadPlanner={onLoadPlanner}
        />
    );
};

export default InfoPostContainer;