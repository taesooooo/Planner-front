/** 드래그 앤 드롭 */

import { useCallback } from 'react';

// 바꿀 일정의 index 구하기
function getElementIndex(p, itemsArr, items) {
    itemsArr.current = items;
    return itemsArr.current.findIndex((plan) => plan === p);
}

// 선택 일정과 바꿀 일정을 바꿈
function switchItem(itemsArr, dragItemIndex, overItemIndex, dragItem) {
    itemsArr.current.splice(dragItemIndex.current, 1);
    itemsArr.current.splice(overItemIndex.current, 0, dragItem.current);
    return itemsArr.current;
}

// db에서 순서를 세팅할 index를 구함.
function getIndex(dragItem, overItemIndex, index, itemsArr, dragItemIndex, items) {
    let prevIndex;
    let nextIndex;
    let curItemIndex = getElementIndex(dragItem.current, itemsArr, items);

    if (overItemIndex.current === 0) {
        index = 500;
    } else if (overItemIndex.current === itemsArr.current.length - 1) {
        index = 2000;
    } else if (dragItemIndex) {
        prevIndex = itemsArr.current[curItemIndex - 1];
        nextIndex = itemsArr.current[curItemIndex + 1];
        index = 1000;
    }
}
// 드래그 시작
export function onDragStart(e, p, setIsDrag, dragTarget, posY, dragItem, dragItemIndex, itemsArr, items) {
    setIsDrag(true);
    // 순서 이동 모션

    // 드래그시 반투명 이미지 제거
    let img = new Image();
    e.dataTransfer.setDragImage(img, 10, 10);

    // 드래그되는 요소
    dragTarget.current = e.currentTarget;
    dragTarget.current.style.zIndex = '100';

    // 마우스 포인터 좌표
    posY.current = e.clientY;

    // 순서 이동 기능
    dragItem.current = p;
    dragItemIndex.current = getElementIndex(p, itemsArr, items);
}
// 드래그 이동
export function onDragMove(e, isDrag, posY, containerRef, itemRef, dragItemIndex, dragTarget, setIsDrag, overTargetArr, itemsArr, dragItem, overItem, overItemIndex, setOverTargetArr) {
    if (isDrag) {
        // 마우스 포인터가 이동한 거리
        const diffY = e.clientY - posY.current;

        // 드래그가 가능한 컨테이너 크기
        const containerHeight = containerRef.current.getBoundingClientRect().height;
        const itemHeight = itemRef.current.getBoundingClientRect().height;

        // 드래그되는 모션
        e.currentTarget.style.top = `${Math.min(Math.max(-itemHeight * dragItemIndex.current, diffY), containerHeight - itemHeight * (dragItemIndex.current + 1))}px`;

        dragTarget.current.style.pointerEvents = 'none';

        // 마우스 포인터가 컨테이너를 벗어날 시 초기화
        if (e.clientY < 0 || e.clientY > containerRef.current.getBoundingClientRect().top + containerHeight) {
            onDragEnd(setIsDrag, overTargetArr, dragTarget, itemsArr, dragItem, dragItemIndex, overItem, overItemIndex, setOverTargetArr);
        }
    }
}
// 드래그한 요소가 드롭될 요소와 겹침
export function onDragEnter(e, p, isDrag, overItem, overItemIndex, overTarget, dragTarget, overTargetArr, setOverTargetArr, dragItemIndex, itemRef, itemsArr, items) {
    if (isDrag) {
        // 순서 이동 기능
        overItem.current = p;
        overItemIndex.current = getElementIndex(p, itemsArr, items);

        // 순서 이동 모션
        // 타겟 요소
        overTarget.current = e.currentTarget;

        // 타겟 요소의 벌어지는 모션
        // 드래그 요소와 타겟 요소가 다른지 확인
        if (dragTarget.current !== overTarget.current) {
            // 타겟 요소 배열에 중복값 제거
            if (!overTargetArr.find((item) => item === e.currentTarget)) {
                setOverTargetArr([...overTargetArr, e.currentTarget]);
            }

            // 드래그 요소와 타겟 요소의 위치에 따른 위/아래 모션 결정
            if (dragItemIndex.current < overItemIndex.current) {
                e.currentTarget.style.transform = `translateY(-${itemRef.current.getBoundingClientRect().height}px)`;
            } else {
                e.currentTarget.style.transform = `translateY(${itemRef.current.getBoundingClientRect().height}px)`;
            }

            // 벌어진 요소가 다시 제자리로 이동
            if (overTargetArr.find((item) => item === e.currentTarget)) {
                e.currentTarget.style.transform = `translateY(${0}px)`;

                setOverTargetArr(overTargetArr.filter((item) => item !== e.currentTarget));
            }
        }
    }
}
// 드래그 종료
export function onDragEnd(setIsDrag, overTargetArr, dragTarget, itemsArr, dragItem, dragItemIndex, overItem, overItemIndex, setOverTargetArr) {
    setIsDrag(false);

    // 이동 모션
    // 드롭시 벌어진 요소 다시 제자리로 이동
    overTargetArr.forEach((item) => (item.style.transform = `translateY(${0}px)`));

    dragTarget.current.style.zIndex = '0';
    dragTarget.current.style.pointerEvents = 'auto';

    // 드래그된 요소 다시 제자리로 이동
    dragTarget.current.style.top = `${0}px`;

    // 사용 변수 초기화
    itemsArr.current = null;
    dragItem.current = null;
    dragItemIndex.current = null;
    overItem.current = null;
    overItemIndex.current = null;
    setOverTargetArr([]);
}
// 드래그 요소를 드롭당할 요소에 드롭
export function onDrop(e, isDrag, itemsArr, dragItemIndex, overItemIndex, dragItem, index, items) {
    e.preventDefault();

    if (isDrag) {
        // 이동 기능
        // onChangePlans(switchItem(itemsArr, dragItemIndex, overItemIndex, dragItem));

        switchItem(itemsArr, dragItemIndex, overItemIndex, dragItem);
        getIndex(dragItem, overItemIndex, index, itemsArr, dragItemIndex, items);
    }
}
// 드래그 요소가 드롭 요소위에 지나감(ondrop 사용시 필수)
export function onDragOver(e) {
    e.preventDefault();
}

/** 페이지네이션 */
// 페이지네이션 배열 생성 함수
export function creaetPageArr(pageLastIndex, setPageArr, count, block) {
    const arr = Array.from({ length: pageLastIndex }, (_, i) => i + 1);

    setPageArr(arr.slice(count * block, count * (block + 1)));
}
// 이전 페이지로
export function prevPage(pageIndex, onChangePageIndex, setBlock, count) {
    if (!(pageIndex === 1)) {
        onChangePageIndex(pageIndex - 1);
        if (pageIndex % count === 1) {
            setBlock((block) => block - 1);
        }
    }
}
// 다음 페이지로
export function nextPage(pageIndex, pageLastIndex, onChangePageIndex, count, setBlock) {
    if (!(pageIndex === pageLastIndex)) {
        onChangePageIndex(pageIndex + 1);
        if (pageIndex % count === 0) {
            setBlock((block) => block + 1);
        }
    }
}
// 첫번째 페이지로
export function firstPage(onChangePageIndex, setBlock) {
    onChangePageIndex(1);
    setBlock(0);
}
// 마지막 페이지로
export function lastPage(onChangePageIndex, pageLastIndex, setBlock, count) {
    onChangePageIndex(pageLastIndex);
    setBlock(Math.ceil(pageLastIndex / count - 1));
}