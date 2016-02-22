using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

/// <summary>
/// Description résumée de UnObjet
/// </summary>

[DataContract(Name = "UnObjet")]
public class UnObjet
{

    [DataMember]
    public string UnePropriete = "Tutu";
    [DataMember]
    public string UneAutrePropreteOuUneCarateristique = "Tutu";
    [DataMember]
    public string UneAutreCarateristique = "Tutu";

    public UnObjet(string s1, string s2, string s3)
    {
        UnePropriete = s1;
        UneAutrePropreteOuUneCarateristique = s2;
        UneAutreCarateristique = s3;
    }
}