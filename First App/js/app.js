class Product extends React.Component {
    render(){
        return <div>
            <h1>Wow, it works</h1>
        </div>
    }
}

ReactDOM.render(
    <Product />, 
    document.getElementById('content')
)