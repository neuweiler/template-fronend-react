import * as React from 'react';
import {defaultOwner, Owner} from "../../model/Owner";
import {OwnerService} from "../../service/OwnerService";
import './ListOwner.css';
import {EditOwner} from "./EditOwner";
import {Columns, DataGrid, ValueFormatterParams} from '@material-ui/data-grid';
import {injectIntl, WrappedComponentProps} from 'react-intl'
import {Button, IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface Props extends WrappedComponentProps {
}

interface State {
	owners: Owner[],
	selectedOwner: Owner,
	edit: boolean,
	add: boolean,
	message?: string
}

class ListOwner extends React.Component<Props, State> {
	public readonly state: State;
	api = new OwnerService();

	columns: Columns = [];

	constructor(props: Props) {
		super(props);

		this.state = {
			owners: [],
			selectedOwner: defaultOwner(),
			add: false,
			edit: false
		}
	}

	componentDidMount = () => {
		this.loadOwners();
	}

	loadOwners(): void {
		this.api.fetch().then((res) => {
			this.setState({owners: res.data.result})
		});
	}

	edit(owner: Owner) {
		this.setState({selectedOwner: owner, edit: true});
	}

	add() {
		this.setState({selectedOwner: defaultOwner(), add: true});
	}

	delete(name: string) {
		this.api.delete(name)
			.then(() => {
				this.setState({message: 'Owner deleted successfully.'});
				this.setState({owners: this.state.owners.filter(owner => owner.name !== name)});
			})
	}

	handleSaveOwner(owner: Owner | undefined) {
		if (owner) {
			if (this.state.add) {
				this.api.add(owner)
					.then((res) => {
						this.setState({message: 'Owner added successfully.'});
						const owners = Object.assign([], this.state.owners);
						owners.push(res.data.result);
						this.setState({owners: owners});
					})
			} else {
				this.api.update(owner)
					.then(() => {
						this.setState({message: 'Owner updated successfully.'});
					})
			}
			Object.assign(this.state.selectedOwner, owner);
		}
		this.setState({edit: false, add: false});
	}

	public render() {
		const {intl} = this.props;
		this.columns = [
			{field: 'name', headerName: intl.formatMessage({id: 'owner.name'}), width: 150},
			{field: '', renderCell: (params: ValueFormatterParams) => (
				<div>
					<IconButton aria-label="add" onClick={() => this.edit(params.data as Owner)}><EditIcon/></IconButton>
					<IconButton aria-label="add" onClick={() => this.delete((params.data as Owner).name)}><DeleteIcon/></IconButton>
				</div>
				), disableClickEventBubbling: true,  width: 170}
		];

		return (
			<React.Fragment>
				<IconButton aria-label="add" color="primary" onClick={() => this.add()}><AddCircleOutlineIcon/></IconButton>
				<div style={{height: 400, width: '100%'}}>
					<DataGrid rows={this.state.owners} columns={this.columns} pageSize={5}/>
				</div>
				<EditOwner edit={this.state.edit} add={this.state.add} owner={{...this.state.selectedOwner}} onClose={t => this.handleSaveOwner(t)}/>
			</React.Fragment>
		);
	}
}

export default injectIntl(ListOwner);
