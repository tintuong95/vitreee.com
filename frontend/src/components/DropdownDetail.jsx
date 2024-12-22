import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FaUserEdit } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { TiFlowChildren } from 'react-icons/ti';
import { FiHeart, FiTrash } from 'react-icons/fi';
import DrawerRootDetail from './DrawerRootDetail';
const items = [
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
    label: 'Thêm vợ chồng',
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
const DropdownDetail = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
    <FaUserEdit className='text-gray-400 ' size={10} />
    </a>
  </Dropdown>
);
export default DropdownDetail;