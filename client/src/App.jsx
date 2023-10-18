import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
const HTTPLink = createHttpLink({
  uri: '/graphql'
})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : '',
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(HTTPLink),
  cache: new InMemoryCache(),

})


function App() {
  return (
    <ApolloProvider client={client}>

      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
