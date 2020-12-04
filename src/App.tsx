import React, {useState} from "react";
import I18nProvider from "./i18n/i18nProvider";
import {LOCALES} from "./i18n/locales";
import AppRouter from "./AppRouter";
import {Container, Link, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Login from "./component/Login";
import AuthenticationService from "./service/AuthenticationService";
import MenuAppBar from "./component/MenuAppBar";

const Copyright: React.FC = () => (
	<Typography variant="body2" color="textSecondary" align="center">
		Copyright &#169; <Link color="inherit" href="https://mycompany.com/">My Company</Link>
		{' '}{new Date().getFullYear()}{'.'}
	</Typography>
)

const App: React.FC = () => {
	const [locale, setLocale] = useState(LOCALES.ENGLISH);
	const [dummy, setDummy] = useState(0);
	const userLoggedIn = AuthenticationService.isUserLoggedIn();

	const handleLogin = () => {
		setDummy(dummy + 1); // redraw component
	}

	const handleLogout = () => {
		AuthenticationService.logout();
		setDummy(dummy + 1); // redraw component
	}

	return (
		<I18nProvider locale={locale}>
			<Container maxWidth="xl">
				<MenuAppBar userLoggedIn={userLoggedIn} onLogout={handleLogout} onLocaleChange={setLocale}/>
				<Box my={4}>

					{userLoggedIn && <AppRouter/>}
					{!userLoggedIn && <Login onLogin={handleLogin}/>}

					<Copyright/>
				</Box>
			</Container>
		</I18nProvider>
	);
}

export default App;
