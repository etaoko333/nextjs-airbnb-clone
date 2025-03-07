import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource, Login } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import { Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { ListingList } from "./listing/ListingList";
import { ListingCreate } from "./listing/ListingCreate";
import { ListingEdit } from "./listing/ListingEdit";
import { ListingShow } from "./listing/ListingShow";
import { WishlistList } from "./wishlist/WishlistList";
import { WishlistCreate } from "./wishlist/WishlistCreate";
import { WishlistEdit } from "./wishlist/WishlistEdit";
import { WishlistShow } from "./wishlist/WishlistShow";
import { TripList } from "./trip/TripList";
import { TripCreate } from "./trip/TripCreate";
import { TripEdit } from "./trip/TripEdit";
import { TripShow } from "./trip/TripShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the JWT token exists when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  if (!dataProvider) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="App">
      <Admin
        title={"airbnb-server"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Listing"
          list={ListingList}
          edit={ListingEdit}
          create={ListingCreate}
          show={ListingShow}
        />
        <Resource
          name="Wishlist"
          list={WishlistList}
          edit={WishlistEdit}
          create={WishlistCreate}
          show={WishlistShow}
        />
        <Resource
          name="Trip"
          list={TripList}
          edit={TripEdit}
          create={TripCreate}
          show={TripShow}
        />
      </Admin>
    </div>
  );
};

export default App;
