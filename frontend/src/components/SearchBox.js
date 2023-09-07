// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';

// export default function SearchBox() {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState('');

//   const submitHandler = (e) => {
//     e.preventDefault();
//     navigate(query ? `/search/?query=${query}` : '/search');
//     e.target.reset();
//   };

//   return (
//     <Form className="d-flex me-auto" onSubmit={submitHandler}>
//       <InputGroup>
//         <FormControl
//           type="text"
//           name="q"
//           id="q"
//           // onChange={(e) => setQuery(e.target.value)}
//           onChange={(e) => {
//             console.log(e.target.value); // Check if this prints the input value
//             setQuery(e.target.value);
//           }}
//           placeholder="Search..."
//           aria-label="Search..."
//           aria-describedby="button-search"
//         ></FormControl>
//         <Button variant="outline-primary" type="submit" id="button-search">
//           <i className="fas fa-search"></i>
//         </Button>
//       </InputGroup>
//     </Form>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // Track expansion state

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
    e.target.reset();
  };

  const toggleExpand = () => {
    setIsExpanded((prevExpanded) => !prevExpanded); // Toggle the expansion state
  };

  return (
    <Form
      className={`d-flex me-auto ${isExpanded ? 'expanded' : ''}`}
      onSubmit={submitHandler}
    >
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search..."
          aria-label="Search..."
          aria-describedby="button-search"
        />
        <Button
          variant="outline-primary"
          type="submit"
          id="button-search"
          onClick={toggleExpand} // Add a click handler to toggle expansion
        >
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
