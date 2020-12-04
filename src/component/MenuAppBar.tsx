import React from 'react';
import {LOCALES} from "../i18n/locales";
import translate from "../i18n/translate";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {FormattedDate} from "react-intl";

type Props = {
	userLoggedIn: boolean;
	onLogout(): void;
	onLocaleChange(locale: string): void;
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const MenuAppBar: React.FC<Props> = ({userLoggedIn, onLogout, onLocaleChange}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLocale = (locale: string) => {
		handleClose();
		onLocaleChange(locale);
	};

	const handleLogout = () => {
		handleClose();
		onLogout();
	}

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						{translate({
							id: 'title',
							value: {time: <FormattedDate value={new Date()} year="numeric" month="long" day="2-digit"/>}
						})}
					</Typography>
					{userLoggedIn && (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle/>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={() => handleLocale(LOCALES.ENGLISH)}>English</MenuItem>
								<MenuItem onClick={() => handleLocale(LOCALES.GERMAN)}>Deutsch</MenuItem>
								<MenuItem onClick={() => handleLocale(LOCALES.FRENCH)}>Fran&ccedil;ais</MenuItem>
								<MenuItem onClick={() => handleLocale(LOCALES.ITALIAN)}>Italiano</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
								<MenuItem onClick={() => handleLogout()}>{translate({id: 'logout'})}</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default MenuAppBar;
