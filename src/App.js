import Slider from "./Slider"

const App = () => {
  return (
    <>
      <Slider
        thumb={
          {
            sm: {
              thumbCount: 3,
              thumbWidth: 100,
              thumbHeight: 50,
              thumbDirection: "vertical",
            },
            md: {
              thumbCount: 5,
              thumbWidth: 160,
              thumbHeight: 80,
              thumbDirection: "horizontal",
            }

          }
        }

        num="5"
      />

    </>
  )
}

export default App

