import { Container } from "react-bootstrap";

function BookDetails(props)
{
    
    return <>
    
    {props.info ? <Container>
        <div className="row m-2 justify-content-center">
            <div><h1>{props.info.title}</h1></div> 
        </div>

    <div className="row m-2 justify-content-center">
        <div><h5>{props.info.description}</h5></div>
    </div>
    
    </Container> : ""}
    </>
}

export default BookDetails;