import React, {useState} from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { bindActionCreators } from 'redux';
import './Announcement.css';
import { Spinner, Button, Modal } from 'react-bootstrap';
import AnnouncementCard from './AnnouncementCard';
import Pagination from '../../_components/Pagination';

class AnnouncementPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            announcements: [], announcement: [],formData: [], currentPage: null, totalPages: null,
            submitted: false
        };
    }

    componentWillMount=()=> {
        const {getAllAnnouncement} = this.props;
        getAllAnnouncement();
    }

    shouldComponentRender=() =>{
        const {loading} = this.props;
       
        if(loading === false) return true
        else if (typeof loading === undefined) return true;
        else if(loading === true) return false;
    }

    handleChange=(e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onPageChanged = data => {
        const { announcements } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const announcement = announcements.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, announcement, totalPages });
      }
 
    handleSubmit=(e) => {
          this.setState({formData:this.state.formData.push(e)})
           this.props.editAnnouncement(this.state.formData);
           this.componentWillMount()
    }
    handleDelete=(id) => {
       console.log(id)
       this.props.deleteAnnouncement(id);
}

 


    render() {
        const {  currentPage, totalPages, announcements } = this.state;
        let totalAnnouncement =0;
      
        if(!this.shouldComponentRender()) return (<Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>);
        const { items } = this.props;
        totalAnnouncement = items?items.length:0;
        if (totalAnnouncement === 0) return null;
    
        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
    
        return (
          <div className="container mb-5">
            <div className="row d-flex flex-row py-5">
    
              <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center">
    
                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalAnnouncement}</strong> Announcements
                   <AnnouncementModal />
                  </h2>
    
                  { currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                    </span>
                  ) }
    
                </div>
    
                <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination totalRecords={totalAnnouncement} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                </div>
              </div>
    
              { items.map(announcement => <AnnouncementCard key={announcement.id} announcement={announcement} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete}/>) }
    
            </div>
          </div>
        );
      }
}

function AnnouncementModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Announcement
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>will get to you soon</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
    const {  authentication, announcements } = state;
    const { user } = authentication;
    const { loading } = announcements;
     const {items} =announcements;
     
    return {
        user,
        items,
        loading
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllAnnouncement: userActions.getAllAnnouncement,
    editAnnouncement: userActions.editAnnouncement,
    deleteAnnouncement: userActions.deleteAnnouncement
}, dispatch)

const connectedAnnouncementPage = connect(mapStateToProps, mapDispatchToProps)(AnnouncementPage);
export { connectedAnnouncementPage as AnnouncementPage };