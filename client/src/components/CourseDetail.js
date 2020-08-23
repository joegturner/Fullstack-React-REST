import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";

class CourseDetail extends Component {
  state = {
    course: null,
    deleteRequested: false,
  };

  render() {
    return (
      <React.Fragment>
        {this.renderButtons()}
        {this.renderCourse()}
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getCourse();
  }

  // Store course data to state from Fetch API
  getCourse = async () => {
    const { fetchAPI } = this.props.context;
    const id = this.props.match.params.id;

    const data = await fetchAPI.getCourse(id);

    if (data.status === 200) {
      this.setState({ course: data.data });
    } else if (data.status === 404) {
      this.props.history.push("/notfound");
    } else {
      this.props.history.push("/error");
    }
  };

  // Delete Course
  handleDelete = async () => {
    const { fetchAPI, authenticatedUser } = this.props.context;
    const id = this.props.match.params.id;
    const { emailAddress, password } = authenticatedUser;

    const data = await fetchAPI.deleteCourse(id, emailAddress, password);

    if (data.status === 204) {
      this.props.history.push("/");
    } else if (data.status === 403) {
      this.props.history.push("/forbidden");
    } else if (data.status === 404) {
      this.props.history.push("/notfound");
    } else {
      this.props.history.push("/error");
    }
  };

  /** Render helper methods **/
  renderCourse() {
    let jsx = [];
    const { course } = this.state;

    if (course !== null) {
      jsx.push(
        <div className="details">
          <div className="details__header">
            <h2 className="heading-2">{course.title}</h2>
            <h3 className="heading-3">{`By ${course.user.firstName} ${course.user.lastName}`}</h3>
          </div>
          <div className="details__description">
            <ReactMarkdown source={course.description} />
          </div>{" "}
          <ul className="details__list-1">
            <li className="details__list-item">
              {course.estimatedTime ? (
                <React.Fragment>
                  <h4 className="heading-4 details__list-title">
                    Estimated Time
                  </h4>
                  <h5 className="details__time">{course.estimatedTime}</h5>
                </React.Fragment>
              ) : null}
            </li>
          </ul>
          <ul className="details__list-2">
            <li className="details__list-item">
              {course.materialsNeeded ? (
                <React.Fragment>
                  <h4 className="heading-4 details__list-title">
                    Materials Needed
                  </h4>
                  <ReactMarkdown
                    className="details__materials"
                    source={course.materialsNeeded}
                  />
                </React.Fragment>
              ) : null}
            </li>
          </ul>
        </div>
      );
    } else {
      jsx.push(
        <h1 key={1} className="loading-text">
          Loading...
        </h1>
      );
    }

    return jsx;
  }

  renderButtons() {
    const { course } = this.state;
    const authUser = this.props.context.authenticatedUser;
    const showDeleteConfirmation = this.state.deleteRequested;

    let authenticated = false;

    if (authUser !== null && this.state.course !== null) {
      if (this.state.course.user.id === authUser.id) {
        authenticated = true;
      }
    }

    if (course !== null) {
      return (
        <React.Fragment>
          <div className="details__menu">
            {authenticated ? (
              <React.Fragment>
                <NavLink className="btn" to={`${course.id}/update`}>
                  Update Course
                </NavLink>
                <button
                  className="btn"
                  onClick={() => this.showDeleteConfirm()}
                >
                  Delete Course
                </button>
              </React.Fragment>
            ) : null}
            <NavLink className="btn btn--secondary" to="/">
              Return to List
            </NavLink>
          </div>

          {showDeleteConfirmation ? (
            <div className="details__sub-menu">
              <button className="btn" onClick={() => this.handleDelete()}>
                Confirm delete
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => this.hideDeleteConfirm()}
              >
                No, cancel
              </button>
            </div>
          ) : null}
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  showDeleteConfirm() {
    this.setState({ deleteRequested: true });
  }

  hideDeleteConfirm() {
    this.setState({ deleteRequested: false });
  }
}

export default CourseDetail;
