using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

[ServiceContract(Namespace = "")]
[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class Service
{
    // Pour utiliser HTTP GET, ajoutez l'attribut [WebGet]. (ResponseFormat par défaut=WebMessageFormat.Json)
    // Pour créer une opération qui renvoie du code XML,
    //     ajoutez [WebGet(ResponseFormat=WebMessageFormat.Xml)],
    //     et incluez la ligne suivante dans le corps de l'opération :
    //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
    [WebGet]
    [OperationContract]
    public List<UnObjet> DoWork()
    {
        List<UnObjet> MesObjets = new List<UnObjet>();
        for (int i = 1; i < 1000; i++)
        {
            MesObjets.Add(new UnObjet("1245", "5454", "45"));
        }

        return MesObjets;
    }

    // Ajoutez des opérations supplémentaires ici et marquez-les avec [OperationContract]
}
