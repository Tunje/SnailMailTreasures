## Week 2 reflections

- I created Homepage.tsx and routing setup using react-router-dom then updated App.tsx to render the Hopepage component.

- I added images slider (carousel) to the Homepage.tsx hero section using react-responsive-carousel library. I also added images for all the products.

- I separated the SearchBar.tsx component and SearchResultPage.tsx form the Navbar, and render them directly inside Homepae.tsx 

- I updated Routes in App.tsx
  <code>
    <>
      <Navbar /> {/* Always rendered */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </>
  </code>
- I updated main.tsx using BrowserRouter

- I created Footer.tsx with Logo, Copyright and Social links using react-icons.

- I updated code for Cart button with a shopping cart icon and updated Login button.

- I created Cart.tsx a sample cart item layout, total price section and "Checkout" button

- I created a simple Login.tsx, Signup.tsx components.

- I created Shop.tsx component includes a simple layout with a heading and placeholder content for shop items.

- I created Deals.tsx to displays products with image, product name, original price (crossed out), discounted price(highlighted) and description.

## Summary

All nav links (login, cart, singup) and banners (Shop, home, deals, favorites ) works as expected but searchbar still can not fetch data from MongoDB.

 
  

