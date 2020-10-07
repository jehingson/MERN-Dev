import {useState, useEffect} from 'react'
import Axios from 'axios'

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cart, setCart] = useState([])
  const [history, setHistory] =  useState([])


  useEffect(() => {
    if(token){
      const getUser  = async () => {
        try{
          const res = await Axios.get('/user/infor',{
            headers: {Authorization: token}
          })
          
          setIsLogged(true)
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

          setCart(res.data.cart)
        }catch(err){
          alert(err.response.data.msg)
        }
      }
      getUser()
    }

  }, [token])

  

  const addCart = async (producto) => {
    console.log(token)
    if(!isLogged) return alert("Porfavor inicie sesion para continuar")

    const check = cart.every(item => {
      return item._id !== producto._id
    })
    if(check) {
      setCart([...cart, {...producto, quantity: 1}])

      await Axios.patch('/user/addcart', 
      {cart: [...cart, {...producto, quantity: 1}]},{
        headers: {Authorization: token}
      })

    }else{
      alert("este producto ha sido añadido al carrito")
    }


  }

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory]
  }
}

export default UserAPI
