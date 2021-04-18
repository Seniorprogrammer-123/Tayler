import React, { Component } from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Head from "./Head";
import { Container } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        }
    }
    // check if user is authenticated and storing authentication data as states if true
    UNSAFE_componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }
    render() {
        return (
            <div>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                <CssBaseline />
                <Head />
                <div className="App">
                    <Container maxWidth="lg">
                        {/* <h1>This is a home page</h1>
                        <h2>Add Side Drawer to Material-UI Navbar</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                        <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                        ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                        quia non numquam eius modi tempora incidunt ut labore et dolore magnam
                        aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
                        ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
                        ea voluptate velit esse quam nihil molestiae consequatur, vel illum
                        qui dolorem eum fugiat quo voluptas nulla pariatur?"
                        </p>
                        <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui
                        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                        et quas molestias excepturi sint occaecati cupiditate non provident,
                        similique sunt in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
                        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
                        autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                        eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                        Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
                        voluptatibus maiores alias consequatur aut perferendis doloribus
                        asperiores repellat."
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                        <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                        ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                        quia non numquam eius modi tempora incidunt ut labore et dolore magnam
                        aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
                        ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
                        ea voluptate velit esse quam nihil molestiae consequatur, vel illum
                        qui dolorem eum fugiat quo voluptas nulla pariatur?"
                        </p>
                        <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui
                        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                        et quas molestias excepturi sint occaecati cupiditate non provident,
                        similique sunt in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
                        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
                        autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                        eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                        Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
                        voluptatibus maiores alias consequatur aut perferendis doloribus
                        asperiores repellat."
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                        <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                        ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                        quia non numquam eius modi tempora incidunt ut labore et dolore magnam
                        aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
                        ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
                        ea voluptate velit esse quam nihil molestiae consequatur, vel illum
                        qui dolorem eum fugiat quo voluptas nulla pariatur?"
                        </p>
                        <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui
                        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                        et quas molestias excepturi sint occaecati cupiditate non provident,
                        similique sunt in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
                        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
                        autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                        eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                        Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
                        voluptatibus maiores alias consequatur aut perferendis doloribus
                        asperiores repellat."
                        </p> */}
                    </Container>
                </div>
                <Footer />
            </div>
        )
    }
}
export default Home
