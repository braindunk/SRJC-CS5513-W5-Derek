import Head from 'next/head';
import Layout from '../components/layout';
import {getAllIds, getData} from '../lib/data';
import Link from 'next/link';
import Image from 'next/image';






//create an instance of the getStaticPaths function to reprot to next all possible dynamic URLs

//get static props to return for one person and runs everytime runs for a specific route and the URL gets handed to us in params ID so we can hand it over to get data
export async function getStaticProps({params}){
  const itemData = await getData(params.id);
  return {
    props: {itemData}
  };
}
//getStaticPaths collects all the possible IDs and lets Next know what they are

export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths,
    fallback: false
  };
}


//make a react component to dispaly all the details about a person

export default function Entry({itemData}){
return (
  <Layout>
  <article className="card col-4">
    <h2>{itemData.name}</h2>
    <div className="box">
      <Image src={itemData.profile} alt="Picture of the Skater" width={200}
        height={200}  priority
/>
      </div>
    <div className="card-body">
      
      <h4 className >Skates for:</h4>
      {itemData.related?
      itemData.related.map(
        ({owner_id, company})=>(
      <h3>{itemData.company}</h3>
      )
      ) : null}
      <h5 className="card-title"> Stats: </h5>
      <h6 className="card-subtitle mb-2 text-muted"></h6>
      <p className="cart-text">Air: {itemData.air}</p>
      <p className="cart-text">Speed: {itemData.speed}</p>
      <p className="cart-text">Balance: {itemData.balance}</p>
      
       </div>
  </article>
  <article className="list-group col-6">
      <div className="card-body">
      {itemData.related?
        <h2>Teammates</h2> 
        : null}
        {itemData.related?
          itemData.related.map (
            ({id, name})=> (
              <Link key={id} href={`/${id}`}>
        <a className="list-group-item list-group-item-action">{name}</a>
        </Link>
            )
          )
        : null}
        </div>
      </article>
</Layout>
  );
}