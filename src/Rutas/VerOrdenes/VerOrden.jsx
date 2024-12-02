const VerOrden = () =>{

    const [ordenes, setOrdenes] = useState()
    const cargarOrdenes = async () => {
        await fetch('http://localhost:4001/estudiante')
            .then(response => response.json())
            .then(data => setOrdenes(data))
    }

    useEffect(() => {
        cargarOrdenes();
    },[])
    return(
        <main className="verOrden">
         <h1>Ordenes</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Subtotal</th>
                    <th>Direccion</th>
                </tr>
            </thead>
            <tbody>
                {
                    ordenes?.map(orden => (
                        <tr key={orden.id}>
                            <td>{orden.id}</td>
                            <td>{orden.subtotal}</td>
                            <td>{orden.direccion}</td>
                            <td>
                                <button >Ver Detalle</button>
                                </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>   
        </main>
    )
}

export default VerOrden;