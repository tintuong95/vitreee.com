import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FaUserEdit } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { TiFlowChildren } from 'react-icons/ti';
import { FiHeart, FiTrash } from 'react-icons/fi';
import DrawerRootDetail from './DrawerRootDetail';
import CreateMember from '../views/TreeRoot/CreateMember';
import { useParams } from 'react-router-dom';

const DropdownDetail = (data) => {
  const {id}=useParams()
  const items=(id,data) => [
    {
      key: '1',
      label: 'Thao tác',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: <DrawerRootDetail/>,
      icon: <MdInfoOutline />
      ,
  
    },
    {
      key: '3',
      label: 'Cập nhật',
      icon: <AiOutlineEdit />
      ,
  
    },
    {
      key: '4',
      label: 'Thêm con cái',
      icon: <TiFlowChildren />
      ,
    
    },
    {
      key: '5',
      label: <CreateMember familyTreeId={id} relationId={data?.data?.id}  relationType={"couple"}/>,
      icon: <FiHeart />
      ,
    
    },
    {
      key: '5',
      label: 'Xóa bỏ',
      icon: <FiTrash />
      ,
      danger: true,
  
    
    },
  ];
  console.log("Data",data?.data?.id)
  return (
    <Dropdown
      menu={{
        items:items(id,data),
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
      <FaUserEdit className='text-gray-400 ' size={10} />
      </a>
    </Dropdown>
  )
};
export default DropdownDetail;