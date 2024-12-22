import { Handle, Position } from '@xyflow/react';
import { Avatar } from 'antd';
import React, { memo } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { IoIosFemale, IoIosMale } from 'react-icons/io';
import DropdownDetail from './DropdownDetail';

const { Top, Bottom, Left, Right } = Position;


export default memo(({ data }) => {
  const { isSpouse, isSibling, label, direction,infomation } = data;

  const isTreeHorizontal = direction === 'LR';

  const getTargetPosition = () => {
    if (isSpouse) {
      return isTreeHorizontal ? Top : Left;
    } else if (isSibling) {
      return isTreeHorizontal ? Bottom : Right;
    }
    return isTreeHorizontal ? Left : Top;
  };

  const isRootNode = data?.isRoot;
  const hasChildren = !!data?.children?.length;
  const hasSiblings = !!data?.siblings?.length;
  const hasSpouses = !!data?.spouses?.length;
console.log("infomation",infomation)
  return (
    <div style={{ 
      borderColor:infomation?.gender==0?'#7dd3fc':'#fda4af'
     }} className={`bg-white border  rounded-lg
     shadow-lg p-2 hover:shadow-2xl hover:scale-110
      transition-all duration-150 ease-in-out`}>
      {/* For children */}
      {hasChildren && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Right : Bottom}
          id={isTreeHorizontal ? Right : Bottom}
        />
      )}

      {/* For spouses */}
      {hasSpouses && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Bottom : Right}
          id={isTreeHorizontal ? Bottom : Right}
        />
      )}

      {/* For siblings */}
      {hasSiblings && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Top : Left}
          id={isTreeHorizontal ? Top : Left}
        />
      )}

      {/* Target Handle */}
      {!isRootNode && (
        <Handle
          type={'target'}
          position={getTargetPosition()}
          id={getTargetPosition()}
        />
      )}
      <div className='flex w-full gap-2 relative  '>
        <div className='w-1/4 flex flex-col justify-center items-center gap-1'>
          <Avatar src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} />
          
          {infomation?.gender==0?<IoIosMale  size={10 } className='text-sky-400'/>:<IoIosFemale  size={10 } className='text-rose-400'/>}
        </div>
        <div className='w-3/4 flex flex-col justify-start items-start text-xs'>
          <div className='font-semibold'>{ infomation?.name}</div>
          <div className='text-gray-500' style={{ fontSize:9 }}>{ infomation?.birthDay}</div>
          <div className='text-gray-500' style={{ fontSize:9 }}>{ infomation?.address}</div>
        </div>
        <div className='absolute bottom-0 right-0'>
          <DropdownDetail/>
        </div>

      </div>
    </div>
  );
});
