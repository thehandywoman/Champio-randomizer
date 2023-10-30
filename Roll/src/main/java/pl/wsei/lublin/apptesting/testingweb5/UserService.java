package pl.wsei.lublin.apptesting.testingweb5;
import java.util.List;

public interface UserService {

    void deleteById(Integer personId);

    User findById(Integer personId);

    User save(User user);

    List searchByCompanyName(String companyName);

}

