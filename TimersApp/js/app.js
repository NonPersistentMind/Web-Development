class TimerDashboard extends React.Component {
  state = {
    timers: [
      {
        mainTitle: 'Practice squat',
        projectTitle: 'Gym Chores',
        id: '1',
        timeElapsed: 5456099,
        runningSince: Date.now(),
      },
      {
        mainTitle: 'Read a book',
        projectTitle: 'Personal Development',
        id: '2',
        timeElapsed: 3600000,
        runningSince: Date.now() - 7200000,
      },
      {
        mainTitle: 'Write code',
        projectTitle: 'Web Development',
        id: '3',
        timeElapsed: 180000,
        runningSince: Date.now() - 120000,
      },
      {
        mainTitle: 'Cook dinner',
        projectTitle: 'Home Tasks',
        id: '4',
        timeElapsed: 7200000,
        runningSince: Date.now() - 3600000,
      },
      {
        mainTitle: 'Painting',
        projectTitle: 'Artistic Pursuits',
        id: '5',
        timeElapsed: 4500000,
        runningSince: Date.now() - 900000,
      },
      {
        mainTitle: 'Walk the dog',
        projectTitle: 'Pet Care',
        id: '6',
        timeElapsed: 1200000,
        runningSince: Date.now() - 600000,
      },
      {
        mainTitle: 'Study Spanish',
        projectTitle: 'Language Learning',
        id: '7',
        timeElapsed: 300000,
        runningSince: Date.now() - 600000,
      },
      {
        mainTitle: 'Clean the house',
        projectTitle: 'Household Chores',
        id: '8',
        timeElapsed: 7200000,
        runningSince: Date.now() - 3600000,
      },
      {
        mainTitle: 'Yoga session',
        projectTitle: 'Fitness',
        id: '9',
        timeElapsed: 2700000,
        runningSince: Date.now() - 1800000,
      },
      {
        mainTitle: 'Write a blog post',
        projectTitle: 'Writing',
        id: '10',
        timeElapsed: 360000,
        runningSince: Date.now(),
      },
    ]
  }

  render() {
    return <div className="ui one column centered grid">
      <div className="column">
        <EditableTimerList
          timers={this.state.timers}
        />
        <div className="bottomsticked">
          <ToggleableTimerForm
            isOpen={false}
          />
        </div>
      </div>
    </div>
  }
}

class EditableTimerList extends React.Component {
  second = 1000;
  minute = this.second * 60;
  hour = this.minute * 60;
  day = this.hour * 24;

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
    this.setState({isOpen: true})
  }

  render() {
    return (
      this.state.isOpen ? <TimerForm /> : (
        <div id="formToggleButton" className="ui basic content center aligned segment">
          <button className="ui blue basic icon button" onMouseOver={this.handleFormOpen}>
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

  render() {
    if (this.state.editableFormOpened) {
      return <TimerForm
        mainTitle={this.props.mainTitle}
        projectTitle={this.props.projectTitle}
      />
    }
    else {
      return <TimerComponent
        mainTitle={this.props.mainTitle}
        projectTitle={this.props.projectTitle}
        timeElapsed={this.props.timeElapsed}
        runningSince={this.props.runningSince}
      />
    }
  }
}

class TimerForm extends React.Component {
  render() {
    const buttonText = this.props.mainTitle ? "Save" : "Create";
    const titleText = this.props.mainTitle ? "Editing" : "Creating";
    const subtitleText = this.props.mainTitle ? "edit" : "create";
    return (
      <div className="ui centered card">
        <div className="content">
          <h3 className="center aligned">{titleText} Timer</h3>
          <div className="center aligned meta">Well, let's {subtitleText}</div>
          <form className="ui form">
            <div className="field">
              <div className="ui fluid labeled input">
                <label className="ui grey basic right pointing label">
                  Title:
                </label>
                <input type="text" defaultValue={this.props.mainTitle} />
              </div>
            </div>
            <div className="field">
              <div className="ui fluid labeled input">
                <label className="ui grey basic right pointing label">
                  Project:
                </label>
                <input type="text" defaultValue={this.props.projectTitle} />
              </div>
            </div>
            <div className="center aligned">
              <div className="ui animated basic positive button">
                <div className="visible content">{buttonText}</div>
                <div className="hidden content">
                  <i className="save icon"></i>
                </div>
              </div>
              <div className="ui animated basic negative button">
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
              <div className="ui blue basic icon button">
                <i className="edit icon"></i>
              </div>
              <div className="ui red basic icon button">
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