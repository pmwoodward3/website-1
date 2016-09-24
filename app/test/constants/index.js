import getMuiTheme from 'material-ui/styles/getMuiTheme'

export const defaultState = {
  location: {
    pathname: '/',
  },
  params: {},
}

export const context = {
  muiTheme: getMuiTheme(),
}

export const mocks = {
  mangaTableItems(count){
    const items = []

    for (let i = 0; i < count; i++) {
      items.push({
        mangaid: i,
      })
    }

    return items
  },
  children(count=10){
    const children = []

    for (let i = 0; i < count; i++) {
      children.push(<div key={i}/>)
    }

    return children
  },
}
