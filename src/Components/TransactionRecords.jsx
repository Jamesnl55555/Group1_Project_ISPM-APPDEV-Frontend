import { Link } from 'react-router-dom';
export default function TransactionRecords({tRecords=[]}){
    if (!tRecords || tRecords.length === 0) {
    return <h1>No Transaction Records Available</h1>;
    }
    return(
    <div>
        <h1>Transaction Records</h1>
        {tRecords.map((records) => (
            <li key={records.id}>
                <Link to={`/user/${records.id}`}>
                <strong>User: </strong> {records.user_name}
                <br/>
                <strong>Quantity: </strong> {records.quantity}
                <br/>
                <strong>Price: </strong> {records.price}
                <br/>
                <strong>Total Amount: </strong> {records.total_amount}
                </Link>
            </li>
        ))}
        <h1>=========================</h1>
    </div>
    );
}