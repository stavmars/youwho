import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './news-post.reducer';
import { Modal, Button } from 'semantic-ui-react';

export interface INewsPostDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NewsPostDeleteDialog extends React.Component<INewsPostDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.newsPostEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { newsPostEntity } = this.props;
    return (
      <Modal open toggle={this.handleClose} style={{ fontFamily: 'TTNormsProMedium' }}>
        <Modal.Header toggle={this.handleClose}>Διαγραγή άρθρου με τίτλο: {newsPostEntity.previewTitle}</Modal.Header>
        <Modal.Content>Είστε σίγουροι πως θέλετε να το διαγράψετε</Modal.Content>
        <Modal.Actions>
          <Button content="Όχι" onClick={this.handleClose} style={{ backgroundColor: '#777eff', color: 'white' }} />
          <Button content="Ναι" onClick={this.confirmDelete} style={{ backgroundColor: '#ff6666', color: 'white' }} />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ newsPost }: IRootState) => ({
  newsPostEntity: newsPost.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPostDeleteDialog);
