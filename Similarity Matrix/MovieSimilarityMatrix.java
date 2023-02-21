import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MovieSimilarityMatrix {
    public static void main(String[] args) {
        Map<Integer, Map<Integer, Double>> movieRatings = new HashMap<>();
        List<Integer> movieIds = new ArrayList<>();

        //Read the Ratings file
        try (BufferedReader br = new BufferedReader(new FileReader("ratings.csv"))) {
            String line;
            boolean firstLine = true;
            while ((line = br.readLine()) != null) {
                if (firstLine) {
                    firstLine = false;
                    continue; // Skip header line
                }

                // Segregate with the delimeter
                String[] values = line.split(",");
                int movieId = Integer.parseInt(values[1]);
                double rating = Double.parseDouble(values[2]);
                if (!movieRatings.containsKey(movieId)) {
                    movieRatings.put(movieId, new HashMap<>());
                    movieIds.add(movieId);
                }
                movieRatings.get(movieId).put(Integer.parseInt(values[0]), rating);
            }
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        List<Integer> filteredMovieIds = new ArrayList<>();
        for (int movieId : movieIds) {
            // Only take movies rated by at least 50 users.
            if (movieRatings.get(movieId).size() >= 50) {
                filteredMovieIds.add(movieId);
            }
        }

        try (FileWriter writer = new FileWriter("similarity_matrix.csv")) {
            writer.append("movie_id");
            for (int movieId : filteredMovieIds) {
                // Naming columns
                writer.append(",ID_" + movieId);
            }
            writer.append("\n");

            for (int movieId1 : filteredMovieIds) {
                writer.append(String.valueOf(movieId1));
                for (int movieId2 : filteredMovieIds) {
                    if (movieId1 == movieId2) {
                        // Same movies
                        writer.append(",1");
                    } else {
                        double similarity = getPearsonSimilarity(movieRatings.get(movieId1), movieRatings.get(movieId2));
                        writer.append("," + similarity);
                    }
                }
                writer.append("\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Similarity calculator
    private static double getPearsonSimilarity(Map<Integer, Double> movie1, Map<Integer, Double> movie2) {
        double averageOne = 0, averageTwo = 0, sumOne = 0, sumTwo = 0, sumOneSquared = 0, sumTwoSquared = 0, aggregatedSum = 0;
        int n = 0;
        for (int userId : movie1.keySet()) {
            if (movie2.containsKey(userId)) {
                double r1 = movie1.get(userId);
                double r2 = movie2.get(userId);
                n++;
                averageOne += r1;
                averageTwo += r2;
                sumOne += r1;
                sumTwo += r2;
                sumOneSquared += Math.pow(r1, 2);
                sumTwoSquared += Math.pow(r2, 2);
                aggregatedSum += r1 * r2;
            }
        }
        if (n == 0) {
            return 0;
        }
        averageOne /= n;
        averageTwo /= n;
        double num = aggregatedSum - (sumOne * averageTwo + sumTwo * averageOne) + n * averageOne * averageTwo;
        double den = Math.sqrt((sumOneSquared - 2 * averageOne * sumOne + n * Math.pow
                (averageOne, 2)) *
                (sumTwoSquared - 2 * averageTwo * sumTwo + n * Math.pow(averageTwo, 2)));
        if (den == 0) {
            return 0;
        }
        return num / den;
    }
}


