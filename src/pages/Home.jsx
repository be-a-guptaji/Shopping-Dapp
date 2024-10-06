import { Spinner } from "../components/Spinner";
import { ProductCard } from "../components/ProductCard";
export const Home = ({ data, loading }) => {
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : data.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {data.map((card) => (
            <ProductCard key={data.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Post Found</p>
        </div>
      )}
    </div>
  );
};
