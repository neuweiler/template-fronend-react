import React, {useState} from "react";
import I18nProvider from "./i18n/i18nProvider";
import {LOCALES} from "./i18n/locales";
import AppRouter from "./AppRouter";
import {Button, Container, Link, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import translate from "./i18n/translate";
import {FormattedDate} from "react-intl";
import Login from "./component/Login";
import AuthenticationService from "./service/AuthenticationService";

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
	}

	return (
		<I18nProvider locale={locale}>
			<Container maxWidth="xl">
				<Button onClick={() => setLocale(LOCALES.ENGLISH)}>English</Button>
				<Button onClick={() => setLocale(LOCALES.GERMAN)}>Deutsch</Button>
				<Button onClick={() => setLocale(LOCALES.FRENCH)}>Fran&ccedil;ais</Button>
				<Button onClick={() => setLocale(LOCALES.ITALIAN)}>Italiano</Button>
				{userLoggedIn && <Button onClick={() => handleLogout}>{translate({id: 'logout'})}</Button>}
				<Box my={4}>
					<Typography variant="h4" component="h1" gutterBottom>
						{translate({
							id: 'title',
							value: {time: <FormattedDate value={new Date()} year="numeric" month="long" day="2-digit"/>}
						})}
					</Typography>

					{userLoggedIn && <AppRouter/>}
					{!userLoggedIn && <Login onLogin={handleLogin}/>}

					<Copyright/>
				</Box>
			</Container>
		</I18nProvider>
	);
}

export default App;
