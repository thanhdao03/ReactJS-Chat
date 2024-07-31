import React from 'react';
import { Input } from 'antd';

const SearchInput = ({ handleSearch, search }) => {
  return (
    <Input
      style={{ padding: '10px', borderRadius: '50px' }}
      placeholder="Tìm kiếm bạn bè"
      onChange={handleSearch}
      value={search}
    />
  );
};

export default SearchInput;
