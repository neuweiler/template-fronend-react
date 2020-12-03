import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {Owner} from "../../model/Owner";
import translate from "../../i18n/translate";

interface Props {
	owner: Owner;
	edit: boolean;
	add: boolean;
	onClose?: (owner: Owner | undefined) => void;
}

export const EditOwner: React.FC<Props> = ({owner, edit, add, onClose}) => {
	const handleCancel = () => {
		if (onClose) {
			onClose(undefined);
		}
	};

	const handleSave = () => {
		if (onClose) {
			onClose(owner);
		}
	};

	return (
		<Dialog open={edit || add} onClose={handleCancel} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{translate({id: (add ? 'owner.add' : 'owner.edit')})}</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					id="name"
					label="Name"
					type="text"
					defaultValue={owner.name}
					onChange={(e) => owner.name = e.target.value}
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel} color="secondary">
					Cancel
				</Button>
				<Button onClick={handleSave} color="primary" type="submit">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}