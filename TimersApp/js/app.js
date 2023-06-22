class TimerDashboard extends React.Component {
  state = {
    timers: [
      {
        mainTitle: 'Practice squat',
        projectTitle: 'Gym Chores',
        id: uuidv4(),
        timeElapsed: 5456099,
        runningSince: Date.now(),
      },
      {
        mainTitle: 'Read a book',
        projectTitle: 'Personal Development',
        id: uuidv4(),
        timeElapsed: 3600000,
        runningSince: Date.now() - 7200000,
      },
      {
        mainTitle: 'Write code',
        projectTitle: 'Web Development',
        id: uuidv4(),
        timeElapsed: 180000,
        runningSince: Date.now() - 120000,
      },
      {
        mainTitle: 'Cook dinner',
        projectTitle: 'Home Tasks',
        id: uuidv4(),
        timeElapsed: 7200000,
        runningSince: Date.now() - 3600000,
      },
      {
        mainTitle: 'Painting',
        projectTitle: 'Artistic Pursuits',
        id: uuidv4(),
        timeElapsed: 4500000,
        runningSince: Date.now() - 900000,
      },
      {
        mainTitle: 'Walk the dog',
        projectTitle: 'Pet Care',
        id: uuidv4(),
        timeElapsed: 1200000,
        runningSince: Date.now() - 600000,
      },
      {
        mainTitle: 'Study Spanish',
        projectTitle: 'Language Learning',
        id: uuidv4(),
        timeElapsed: 300000,
        runningSince: Date.now() - 600000,
      },
      {
        mainTitle: 'Clean the house',
        projectTitle: 'Household Chores',
        id: uuidv4(),
        timeElapsed: 7200000,
        runningSince: Date.now() - 3600000,
      },
      {
        mainTitle: 'Yoga session',
        projectTitle: 'Fitness',
        id: uuidv4(),
        timeElapsed: 2700000,
        runningSince: Date.now() - 1800000,
      },
      {
        mainTitle: 'Write a blog post',
        projectTitle: 'Writing',
        id: uuidv4(),
        timeElapsed: 360000,
        runningSince: Date.now(),
      },
    ]
  };

  handleTimerCreateFormSubmit = (timerData) => {
    this.createTimer(timerData);
  };

  handleTimerEditFormSubmit = (timerData) => {
    this.editTimer(timerData);
  };

  handleTimerComponentDelete = (timerID) => {
    this.deleteTimer(timerID);
  };

  createTimer = (timerData) => {
    this.setState({
      timers: this.state.timers.concat({
        mainTitle: timerData.mainTitle,
        projectTitle: timerData.projectTitle,
        id: uuidv4(),
        timeElapsed: 0,
        runningSince: Date.now()
      })
    });
  };

  editTimer = (timerData) => {
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id == timerData.id) {
          return Object.assign({}, timer, {
            mainTitle: timerData.mainTitle,
            projectTitle: timerData.projectTitle
          });
        }
        return timer;
      })
    });
  };

  deleteTimer = (timerID) => {
    this.setState({
      timers: this.state.timers.filter(timer => timerID !== timer.id)
    });
  }

  render() {
    return <div className="ui one column centered grid">
      <div className="column">
        <EditableTimerList
          timers={this.state.timers}
          onSubmit={this.handleTimerEditFormSubmit}
          onDelete={this.handleTimerComponentDelete}
        />
        <div className="bottomsticked">
          <ToggleableTimerForm
            isOpen={false}
            onSubmit={this.handleTimerCreateFormSubmit}
          />
        </div>
      </div>
    </div>
  }
}

class EditableTimerList extends React.Component {
  render() {
    return <div id="timers">
      {
        this.props.timers.map(
          (timer) => <EditableTimer
            key={timer.id}
            id={timer.id}
            mainTitle={timer.mainTitle}
            projectTitle={timer.projectTitle}
            timeElapsed={timer.timeElapsed}
            runningSince={timer.runningSince}
            onSubmit={this.props.onSubmit}
            onDelete={this.props.onDelete}
          />
        )
      }
    </div>
  }
}

class ToggleableTimerForm extends React.Component {
  state = {
    isOpen: false,
  }

  handleFormOpen = () => {
    // const toggleButton = document.getElementById('formToggleButton');
    // toggleButton.toggleAttribute('left-slided');
    this.setState({ isOpen: true })
  }

  onFormSubmit = (timerData) => {
    this.props.onSubmit(timerData);
    this.setState({ isOpen: false });
  }
  onFormDiscard = () => {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      this.state.isOpen ?
        <TimerForm
          onSubmit={this.onFormSubmit}
          onDiscard={this.onFormDiscard}
        /> : (
          <div id="formToggleButton" className="ui basic content center aligned segment">
            <button className="ui blue basic icon button" onClick={this.handleFormOpen}>
              <i className="large icon plus"></i>
            </button>
          </div>
        )
    )
  }
}

class EditableTimer extends React.Component {
  state = {
    editableFormOpened: false,
  }

  // When the form is edited and submitted, edit the state to close the form and propagate the data up
  onEditFormSubmit = (timerData) => {
    const newState = Object.assign({}, this.state, { editableFormOpened: false });
    this.setState(newState);
    this.props.onSubmit(timerData);
  };

  // Handle the "close" button in the edit form by dismissing any changes whatsoever and switching to the timer component
  handleEditFormClose = () => {
    const newState = Object.assign({}, this.state, { editableFormOpened: false });
    this.setState(newState);
  };

  handleEditButtonClick = () => {
    const newState = Object.assign({}, this.state, { editableFormOpened: true });
    this.setState(newState);
  };


  render() {
    if (this.state.editableFormOpened) {
      return <TimerForm
        id={this.props.id}
        mainTitle={this.props.mainTitle}
        projectTitle={this.props.projectTitle}
        onSubmit={this.onEditFormSubmit}
        onDiscard={this.handleEditFormClose}
      />
    }
    else {
      return <TimerComponent
        id={this.props.id}
        mainTitle={this.props.mainTitle}
        projectTitle={this.props.projectTitle}
        timeElapsed={this.props.timeElapsed}
        runningSince={this.props.runningSince}
        onEdit={this.handleEditButtonClick}
        onDelete={this.props.onDelete}
      />
    }
  }
}

class TimerForm extends React.Component {
  state = {
    mainTitle: this.props.mainTitle || '',
    projectTitle: this.props.projectTitle || ''
  }

  handleTitleChange = (event) => {
    this.setState(Object.assign({}, this.state, { mainTitle: event.target.value }));
  }
  handleProjectChange = (event) => {
    this.setState(Object.assign({}, this.state, { projectTitle: event.target.value }));
  }

  onSubmit = () => {
    const noTitle = this.state.mainTitle.trim() === '';
    const noProject = this.state.projectTitle.trim() === ''
    if (! (noTitle || noProject)){
      this.props.onSubmit(
        {
          'id': this.props.id,
          'mainTitle': this.state.mainTitle,
          'projectTitle': this.state.projectTitle,
        }
      );
      return;
    }

    const setError = (element) => {
      element.classList.remove('grey');
      element.classList.remove('basic');
      element.classList.add('red');
    };
    const removeError = (element) => {
      element.classList.add('grey');
      element.classList.add('basic');
      element.classList.remove('red');
    };

    const titleLabel = document.getElementById(this.props.id + 'title');
    const projectLabel = document.getElementById(this.props.id + 'project');
    if (noTitle) {
      setError(titleLabel);
    }
    else{
      removeError(titleLabel);
    }

    if (noProject) {
      setError(projectLabel);
    }
    else {
      removeError(projectLabel);
    }
  }

  render() {
    const buttonText = this.props.id ? "Save" : "Create";
    const titleText = this.props.id ? "Editing" : "Creating";
    const subtitleText = this.props.id ? "edit" : "create";
    return (
      <div className="ui centered card" onMouseOut={(e) => e.target.toggle}>
        <div className="content">
          <h3 className="center aligned">{titleText} Timer</h3>
          <div className="center aligned meta">Well, let's {subtitleText}</div>
          <form className="ui form">
            <div className="field">
              <div className="ui fluid labeled input">
                <label id={this.props.id + 'title'} className="ui grey basic right pointing label">
                  Title:
                </label>
                <input type="text" value={this.state.mainTitle} onChange={this.handleTitleChange} />
              </div>
            </div>
            <div className="field">
              <div className="ui fluid labeled input">
                <label id={this.props.id + 'project'} className="ui grey basic right pointing label">
                  Project:
                </label>
                <input type="text" value={this.state.projectTitle} onChange={this.handleProjectChange} />
              </div>
            </div>
            <div className="center aligned">
              <div className="ui animated basic positive button" onClick={this.onSubmit}>
                <div className="visible content">{buttonText}</div>
                <div className="hidden content">
                  <i className="save icon"></i>
                </div>
              </div>
              <div className="ui animated basic negative button" onClick={this.props.onDiscard}>
                <div className="visible content">Cancel</div>
                <div className="hidden content">
                  <i className="undo icon"></i>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

class TimerComponent extends React.Component {
  onDelete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    const msec = this.props.timeElapsed % 1000;
    const sec = (this.props.timeElapsed - msec) / 1000;
    const mins = (sec - sec % 60) / 60;
    const hours = (mins - mins % 60) / 60;
    const days = (hours - hours % 24) / 24;
    const elapsed = (days ? `${days}d` : '') + `${hours % 24}h ` + `${mins % 60}m ` + `${sec % 60}s`;

    return (
      <div className="ui centered card">
        <div className="timebox">
          <ClockComponent />
          <a className="ui big olive basic pointing label">
            {elapsed}
          </a>
        </div>
        <div className="content">
          <h2 className="ui grey header">
            {this.props.mainTitle}
          </h2>
          <div className="ui large grey sub header description">Project: {this.props.projectTitle}</div>
          <div className="right aligned">
            <div className="ui small buttons">
              <div className="ui blue basic icon button" onClick={this.props.onEdit}>
                <i className="edit icon"></i>
              </div>
              <div className="ui red basic icon button" onClick={this.onDelete}>
                <i className="trash icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ClockComponent extends React.Component {
  render() {
    return (
      <div className="clock-item">
        <div className="hours-container clock-container">
          <div className="hours"></div>
        </div>
        <div className="minutes-container clock-container">
          <div className="minutes"></div>
        </div>
        <div className="seconds-container clock-container">
          <div className="seconds"></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <TimerDashboard />,
  document.getElementById("content")
)