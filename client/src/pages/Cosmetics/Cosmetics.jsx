import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CosmeticCard from '../../components/CosmeticCard';
import { ToastContainer, toast } from 'react-toastify';
import './Cosmetics.css';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Cosmetics = ({ productItems, cartItems, setCartItems }) => {
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [sortType, setSortType] = useState(localStorage.getItem('sortType') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || '');

  const notify = () => toast('You have successfully added the product to the cart!');

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem('searchQuery') || '';
    const storedSortType = localStorage.getItem('sortType') || '';
    setSearchQuery(storedSearchQuery);
    setSortType(storedSortType);
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortType(value);
    localStorage.setItem('sortType', value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
      localStorage.removeItem('selectedCategory', category);
    } else {
      setSelectedCategory(category);
      localStorage.setItem('selectedCategory', category);
    }
    setCurrentPage(1);
  };

  const filteredByCategory = selectedCategory
    ? productItems.filter((item) => item.type === selectedCategory)
    : productItems;

  const filteredProducts = filteredByCategory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFilteredItems = filteredProducts.length;

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortType === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortType === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Header />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="cosmetics_products_background">
        <section className="cosmetics_products">
          <div>
            <TextField
              sx={{ margin: "0 40px 50px 50px" }}
              label="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                sx: {
                  "& fieldset": { borderColor: "green" },
                  "&:hover fieldset": { borderColor: "green" },
                  "&.Mui-focused fieldset": { borderColor: "green" },
                },
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              InputLabelProps={{
                sx: {
                  color: "green",
                  "&.Mui-focused": { color: "green" },
                },
              }}
            />
            <FormControl
              sx={{
                width: "200px",
                marginRight: '20px',
                "& fieldset": { borderColor: "green" },
                "&:hover fieldset": { borderColor: "green" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              }}
            >
              <InputLabel
                sx={{
                  color: "green",
                  "&.Mui-focused": { color: "green" },
                }}
              >
                Sort by
              </InputLabel>
              <Select label='Sort by' value={sortType} onChange={handleSortChange}>
                <MenuItem value="sort">-</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
            <Button
              style={{
                color: selectedCategory === 'For Face' ? 'white' : 'green',
                backgroundColor: selectedCategory === 'For Face' ? 'green' : 'white',
                border: "1px solid green",
                height: "56px"
              }}
              onClick={() => handleCategoryChange('For Face')}
            >
              For Face
            </Button>
            <Button
              style={{
                color: selectedCategory === 'For Body' ? 'white' : 'green',
                backgroundColor: selectedCategory === 'For Body' ? 'green' : 'white',
                border: "1px solid green",
                height: "56px",
                marginLeft: "20px"
              }}
              onClick={() => handleCategoryChange('For Body')}
            >
              For Body
            </Button>
          </div>
          <div className="cosmetics_products_section">
            {currentItems.length === 0 ? (
              <Typography variant="h6" color="textSecondary" align="center">
                No products found
              </Typography>
            ) : (
              currentItems.map(({ id, img, name, type, price }) => (
                <CosmeticCard
                  key={id}
                  id={id}
                  image={`http://localhost:5000/static/${img}`}
                  name={name}
                  type={type}
                  price={price}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  notify={notify}
                />
              ))
            )}
          </div>
          {/* Пагінація */}
          <Stack spacing={2} justifyContent="center" >
            <Pagination
              count={Math.ceil(totalFilteredItems / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </section>
      </div>
    </div>
  );
};

export default Cosmetics;
