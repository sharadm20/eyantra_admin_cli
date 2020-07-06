import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { bindActionCreators } from 'redux';
import './Calendar.css';
import { Spinner, Table } from 'react-bootstrap';
import Pagination from '../../_components/Pagination';
import CalendarModal from './CalendarModal';


class CalendarPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            calendars: [], calendar: [],formData: [], currentPage: null, totalPages: null,
            submitted: false
        };
    }

    componentWillMount=()=> {
        const {getAllCalendar} = this.props;
        getAllCalendar();
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
        const { items } = this.props;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const calendars = items.slice(offset, offset + pageLimit);

        this.setState({ currentPage, calendars, totalPages });
      }

    handleSubmit=(e) => {
          this.setState({formData:this.state.formData.push(e)})
           this.props.editCalendar(this.state.formData);
           this.componentWillMount()
    }
    addCalendar=(e) => {
      console.log(e.date);
      const { addCalendar } = this.props;
      addCalendar(e.event, e.date, e.description, e.location);

      }

    handleDelete=(id) => {
       console.log(id)
       this.props.deleteCalendar(id);
        }




    render() {
        const {  currentPage, totalPages, calendars } = this.state;
        let totalCalendars =0;

        if(!this.shouldComponentRender()) return (<Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>);
        const { items } = this.props;
        totalCalendars = items?items.length:0;
       
        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

        return (
          <div className="container mb-5">
            <div className="row d-flex flex-row py-5">

              <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center">

                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalCalendars}</strong> Calendar Event
                    <CalendarModal handleSubmit={this.addCalendar} />
                  </h2>

                  { currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                    </span>
                  ) }

                </div>

                <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination totalRecords={totalCalendars} pageLimit={20} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                </div>
              </div>
              <Table striped bordered hover>
              <thead>
                    <tr>
                      <th>#</th>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
              { calendars.map(cal =>{return (
                    <tr>
                      <td>{cal.id}</td>
                      <td>{cal.event}</td>
                      <td>{cal.date}</td>
                      <td>{cal.description}</td>
                      <td>{cal.location}</td>
                    </tr>

              )} ) }
               </tbody>
            </Table>
            </div>
          </div>
        );
      }
    }

function mapStateToProps(state) {
    const {  authentication, calendars } = state;
    const { user } = authentication;
     const {items, loading} =calendars;
  
    return {
        user,
        items,
        loading
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllCalendar: userActions.getAllCalendar,
    addCalendar: userActions.addCalendar,
    editCalendar: userActions.editCalendar,
    deleteCalendar: userActions.deleteCalendar
}, dispatch)

const connectedCalendarPage = connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
export { connectedCalendarPage as CalendarPage };
