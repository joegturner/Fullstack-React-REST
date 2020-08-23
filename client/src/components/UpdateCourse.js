import React, { Component } from "react";
import Form from "./Form";

class UpdateCourse extends Component {
  state = {
    status: null,
    id: null,
    message: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    user: null,
    errors: [],
  };

  render() {
    const { errors } = this.state;

    const { status } = this.state;

    this.checkUser();

    return (
      <div className="course-data">
        <h1>Update Course</h1>
        {status ? (
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="course-data__box-1">
                  {this.renderFormTitle()}
                  {this.renderFormDescription()}
                </div>
                <div className="course-data__box-2">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      {this.renderFormEstimatedTime()}
                    </ul>
                  </div>
                </div>
                <div className="course-data__box-3">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      {this.renderFormMaterialsNeeded()}
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        ) : (
          <div className="container">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.getCourse();
  }

  // Save course data to state from Fetch API
  getCourse = async () => {
    const { fetchAPI } = this.props.context;
    const id = this.props.match.params.id;

    const data = await fetchAPI.getCourse(id);

    if (data.status === 200) {
      this.setState({ ...data.data, status: data.status });
    } else if (data.status === 404) {
      this.props.history.push("/notfound");
    } else {
      this.props.history.push("/error");
    }
  };

  // verify authenticated user owns the course
  checkUser = () => {
    let courseUserId;
    const authUserId = this.props.context.authenticatedUser.id;

    if (this.state.user !== null) {
      courseUserId = this.state.user.id;
    }
    if (courseUserId > 0) {
      if (courseUserId !== authUserId) {
        this.props.history.push("/forbidden");
      }
    }
  };

  change = (event) => {
    const { name, value } = event.target;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = async () => {
    const { fetchAPI, authenticatedUser } = this.props.context;
    const index = this.props.match.params.id;
    const { emailAddress, password } = authenticatedUser;

    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const updates = {
      title,
      description: description.replace(/\n/g, "  \n"),
      estimatedTime: estimatedTime.includes("hour")
        ? estimatedTime
        : estimatedTime.includes("one", 0) ||
          (estimatedTime.length === 1 && estimatedTime.includes("1", 0))
        ? estimatedTime + " hour"
        : estimatedTime + " hours",
      materialsNeeded: materialsNeeded.replace(/\n/g, "  \n"),
    };

    const data = await fetchAPI.updateCourse(
      index,
      updates,
      emailAddress,
      password
    );

    if (data.status === 204) {
      this.props.history.push(`/courses${data.location}`);
    } else if (data.status === 400) {
      this.setState({ errors: data.errors });
    } else if (data.status === 401 || data.status === 403) {
      this.props.history.push(`/forbidden`);
    } else if (data.status === 404) {
      this.props.history.push(`/notfound`);
    } else {
      this.props.history.push("/error");
    }
  };

  cancel = () => {
    const index = this.props.match.params.id;
    this.props.history.push(`/courses/${index}`);
  };

  /** Render helper methods **/

  renderFormTitle() {
    const { title } = this.state;

    return (
      <div key={1} className="course--header">
        <div>
          <input
            className="input-title course--title--input"
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={this.change}
            placeholder={title}
          />
        </div>
        <p>By Joes Smith</p>
      </div>
    );
  }

  renderFormDescription() {
    const { description } = this.state;
    return (
      <div className="course--description">
        <textarea
          id="description"
          name="description"
          className=""
          value={description}
          onChange={this.change}
          placeholder="Course description..."
        ></textarea>
      </div>
    );
  }

  renderFormEstimatedTime() {
    const { estimatedTime } = this.state;
    return (
      <li className="course--stats--list--item">
        <h4>Estimated Time</h4>
        <div>
          <input
            id="estimatedTime"
            name="estimatedTime"
            type="text"
            className="course--time--input"
            value={estimatedTime}
            onChange={this.change}
            placeholder="Hours"
          ></input>
        </div>
      </li>
    );
  }

  renderFormMaterialsNeeded() {
    const { materialsNeeded } = this.state;
    return (
      <li className="course--stats--list--item">
        <h4>Materials Needed</h4>
        <div>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            className=""
            value={materialsNeeded}
            onChange={this.change}
            placeholder="List materials..."
          ></textarea>
        </div>
      </li>
    );
  }
}

export default UpdateCourse;
