import * as React from 'react';
import {useEffect, useState} from 'react';
import {defaultOwner, Owner} from "../../model/Owner";
import {ApiServiceOwner} from "../../service/ApiServiceOwner";
import {EditOwner} from "./EditOwner";
import {DataGrid, ValueFormatterParams} from '@material-ui/data-grid';
import {useIntl} from 'react-intl'
import {IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface Props {
}

export const ListOwner: React.FC<Props> = () => {
	const [owners, setOwners] = useState([] as Owner[]);
	const [selectedOwner, setSelectedOwner] = useState(defaultOwner());
	const [edit, setEdit] = useState(false);
	const [add, setAdd] = useState(false);
	const [message, setMessage] = useState('');

	const intl = useIntl();
	const api = new ApiServiceOwner();

	useEffect(() => {
		loadOwners();
	}, []);

	const loadOwners = () => {
		api.fetch().then((res) => {
			setOwners(res.data.result);
		});
	}

	const editOwner = (owner: Owner) => {
		setSelectedOwner(owner);
		setEdit(true);
	}

	const addOwner = () => {
		setSelectedOwner(defaultOwner());
		setAdd(true);
	}

	const deleteOwner = (id: number) => {
		api.delete(id)
			.then(() => {
				setMessage('Owner deleted successfully.');
				setOwners(owners.filter(owner => owner.id !== id));
			})
	}

	const handleSaveOwner = (owner: Owner | undefined) => {
		if (owner) {
			if (add) {
				api.add(owner)
					.then((res) => {
						setMessage('Owner added successfully.');
						const newOwners = Object.assign([], owners);
						newOwners.push(res.data.result);
						setOwners(newOwners);
					})
			} else {
				api.update(owner)
					.then(() => {
						setMessage('Owner updated successfully.');
					})
			}
			Object.assign(selectedOwner, owner);
		}
		setEdit(false);
		setAdd(false);
	}

	const columns = [
		{field: 'name', headerName: intl.formatMessage({id: 'owner.name'}), flex: 1},
		{
			field: '', renderCell: (params: ValueFormatterParams) => (
				<div>
					<IconButton aria-label="edit" onClick={() => editOwner(params.data as Owner)}>
						<EditIcon/>
					</IconButton>
					<IconButton aria-label="delete" onClick={() => deleteOwner((params.data as Owner).id)}>
						<DeleteIcon/>
					</IconButton>
				</div>
			), disableClickEventBubbling: true, width: 128
		}
	];

	return (
		<React.Fragment>
			<IconButton aria-label="add" color="primary" onClick={() => addOwner()}>
				<AddCircleOutlineIcon/>
			</IconButton>
			<div style={{height: 400, width: '100%'}}>
				<DataGrid rows={owners} columns={columns} pageSize={5}/>
			</div>
			<EditOwner edit={edit} add={add} owner={{...selectedOwner}}
					   onClose={t => handleSaveOwner(t)}/>
		</React.Fragment>
	);
}

export default ListOwner;
